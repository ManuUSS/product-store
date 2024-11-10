import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";
import { UserEntity } from "../../domain/entities/user.entity";




export class AuthService {

  constructor() {};

  public async registerUser( registerUser:RegisterUserDto ) {

    const existsUser = await UserModel.findOne({ email:registerUser.email });

    if( existsUser ) throw CustomError.badRequest('User already exists');
    
    try {
      const user = new UserModel( registerUser );
      await user.save();

      const { password, ...rest } = UserEntity.fromObject( user );

      return { ...rest, token: 'ABC' };

    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }


  }

};
