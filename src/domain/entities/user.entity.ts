import { CustomError } from "../errors/custom.error";



export class UserEntity {

  constructor(
    public readonly id:string,
    public readonly name:string,
    public readonly email:string,
    public readonly emailValidated:boolean,
    public readonly password:string,
    public readonly role:string[],
    public readonly img?:string,
  ){};

  static fromObject( obj:Record<string,any> ):UserEntity {

    const {
      id,
      _id,
      name,
      email,
      emailValidated,
      password,
      role,
      img
    } = obj;

    if( !id && !_id ) {
      throw CustomError.badRequest( 'Missing user id' );
    }
    if( !name ) throw CustomError.badRequest( 'Missing user name' );
    if( !email ) throw CustomError.badRequest( 'Missing user email' );
    if( emailValidated === undefined ) throw CustomError.badRequest( 'Missing user email validated' );
    if( !password ) throw CustomError.badRequest( 'Missing user password' );
    if( !role ) throw CustomError.badRequest( 'Missing user role' );

    return new UserEntity(
      id || _id,
      name,
      email,
      emailValidated,
      password,
      role,
      img
    );

  }


}
