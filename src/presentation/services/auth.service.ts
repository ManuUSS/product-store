import { BcryptAdapter, JWTAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { UserEntity } from '../../domain/entities/user.entity';
import { type EmailService } from './email.service';


export class AuthService {

  constructor(
    private readonly emailService:EmailService,
  ) {};

  public async registerUser( registerUser:RegisterUserDto ) {

    const existsUser = await UserModel.findOne({ email:registerUser.email });

    if( existsUser ) throw CustomError.badRequest('User already exists');
    
    try {
      const user = new UserModel( registerUser );

      user.password = BcryptAdapter.hash( registerUser.password );

      await user.save();
      this.sendEmailValidationLink( user.email );

      const { password, ...rest } = UserEntity.fromObject( user );

      return { user: rest, token: 'ABC' };

    } catch ( error ) {
      throw CustomError.internalServer(`${ error }`);
    }


  }


  public async loginUser( loginUserDto:LoginUserDto ) {

    const existsUser = await UserModel.findOne({ email:loginUserDto.email });

    if( !existsUser ) throw CustomError.badRequest('Email and password do not match');

    const isPasswordMatching = BcryptAdapter.compare( 
      loginUserDto.password, 
      existsUser.password 
    );

    if( !isPasswordMatching ) throw CustomError.badRequest('Email and password do not match');

    const { password, ...rest } = UserEntity.fromObject( existsUser );

    const token = await JWTAdapter.generateToken({ id: existsUser._id });

    if( !token ) throw CustomError.internalServer('Error generating token');

    return { user: rest, token };

  }

  private async sendEmailValidationLink ( email:string ) {
    
    const token = await JWTAdapter.generateToken({ email });
    if( !token ) throw CustomError.internalServer('Error generating token');

    const link = `localhost:300/`;

  }

};
