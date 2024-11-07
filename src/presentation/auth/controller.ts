import { type Request, type Response } from 'express';



export class AuthController {


  constructor () {}

  register = ( req:Request, res:Response ) => {
    res.json('register');
  }

  loginUser = ( req:Request, res:Response ) => {
    res.json('loginUser');
  }

  validateUser = ( req:Request, res:Response ) => {
    res.json('validateUser');
  }

}
