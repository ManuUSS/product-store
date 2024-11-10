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

  static verifyToken( token:string ):Record<string, any> {
    return { id: 'any' };
  };

};