import jwt from 'jsonwebtoken';


export class JWTAdapter {


  static generateToken( payload:Record<string, any>, duration:string = '2h' ):string {
    



    return 'any';

  };

  static verifyToken( token:string ):Record<string, any> {
    return { id: 'any' };
  };

};