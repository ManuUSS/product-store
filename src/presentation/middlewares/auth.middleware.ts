import { type NextFunction, type Request, type Response } from 'express';

export class AuthMiddleware {

  static async validateJWT( req:Request, res:Response, next:NextFunction ) {

    const authHeader = req.header('Authorization');

    if( !authHeader ) return res.status(401).json({ error: 'Token not provided' });
    if( !authHeader.startsWith('Bearer ') ) 
      return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authHeader.split(' ').at(1) || '';

    try {
      
    } catch ( error ) {
      console.log( error );
      res.status( 500 ).json({ error: 'Internal server error' });
    }




  };

};


