import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SECRET;
export class JWTAdapter {


  static async generateToken( payload:Record<string, any>, duration:string = '2h' ) {
    
    return new Promise(( resolve ) => {
      jwt.sign( payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        
        if ( err ) resolve( null );
        
        resolve( token );
      
      });
    });

  };

  static verifyToken<T>( token:string ):Promise<T | null> {

    return new Promise(( resolve ) => {
      jwt.verify( token, JWT_SEED, (err, decoded) => {
        
        if ( err ) resolve( null );
        
        resolve( decoded as T );
      
      });
    });

  };

};