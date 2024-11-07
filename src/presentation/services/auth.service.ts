import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";




export class AuthService {

  constructor() {};

  public async registerUser( registerUser:RegisterUserDto ) {

    const existsUser = await UserModel.findOne({ email:registerUser.email });

    if( existsUser ) throw CustomError.badRequest('User already exists');

  }

};
