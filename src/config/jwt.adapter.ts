import jwt from 'jsonwebtoken';


export class JWTAdapter {


  static async generateToken( payload:Record<string, any>, duration:string = '2h' ) {
    
    return new Promise(( resolve ) => {
      jwt.sign( payload, "SEED", { expiresIn: duration }, (err, token) => {
        
        if ( err ) resolve( null );
        
        resolve( token );
      
      });
    });

  };

  static verifyToken( token:string ):Record<string, any> {
    return { id: 'any' };
  };

};