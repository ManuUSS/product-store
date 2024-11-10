import { regularExps } from '../../../config';


export class LoginUserDto {

  private constructor(
    public readonly email:string,
    public readonly password:string,
  ){};

  static login( object:Record<string, any> ):[ string?, LoginUserDto? ] {

    const { email, password } = object;

    if( !email ) return [ 'Email is required' ];
    if( !regularExps.email.test(email) ) return [ 'Invalid email' ];
    if( !password ) return [ 'Password is required' ];
    if( password.length < 6 ) return [ 'Password must have at least 6 characters' ];

    return [ undefined, new LoginUserDto(email, password) ];

  };

}
