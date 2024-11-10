import { type Request, type Response } from 'express';
import { RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';



export class AuthController {


  constructor(
    public readonly authService:AuthService,
  ) {}

  register = ( req:Request, res:Response ) => {

    const [ error, userRegisterDto ] = RegisterUserDto.create( req.body );

    if( error ) return res.status(400).json({ error });

    this.authService.registerUser( userRegisterDto! )
      .then( user => res.json( user ) )
      res.json('register');
  }

  loginUser = ( req:Request, res:Response ) => {
    res.json('loginUser');
  }

  validateUser = ( req:Request, res:Response ) => {
    res.json('validateUser');
  }

}
