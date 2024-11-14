import { type NextFunction, type Request, type Response } from 'express';
import { JWTAdapter } from '../../config';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain/entities/user.entity';

export class AuthMiddleware {

  static async validateJWT( req:Request, res:Response, next:NextFunction ) {

    const authHeader = req.header('Authorization');

    if( !authHeader ) return res.status(401).json({ error: 'Token not provided' });
    if( !authHeader.startsWith('Bearer ') ) 
      return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authHeader.split(' ').at(1) || '';

    try {
      const payload = await JWTAdapter.verifyToken<{ id:string }>( token ); 
      if( !payload ) return res.status( 401 ).json({ error: 'Invalid token' });     
      
      const user = await UserModel.findById( payload.id );
      if( !user ) return res.status( 401 ).json({ error: 'Invalid token - user' });

      req.body.user = UserEntity.fromObject( user );

      next();

    } catch ( error ) {
      console.log( error );
      res.status( 500 ).json({ error: 'Internal server error' });
    }

  };

};


