import { type Request, type Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';



export class AuthController {


  constructor(
    public readonly authService:AuthService,
  ) {}

  private handleError = ( error:unknown, res:Response ) => {

    if( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    } 

    return res.status(500).json({ error: 'Internal server error' });

  }

  register = ( req:Request, res:Response ) => {

    const [ error, userRegisterDto ] = RegisterUserDto.create( req.body );

    if( error ) return res.status(400).json({ error });

    this.authService.registerUser( userRegisterDto! )
      .then( user => res.json( user ) )
      .catch( error => this.handleError( error, res ) );
      res.json('register');
  }

  loginUser = ( req:Request, res:Response ) => {
    res.json('loginUser');
  }

  validateUser = ( req:Request, res:Response ) => {
    res.json('validateUser');
  }

}
