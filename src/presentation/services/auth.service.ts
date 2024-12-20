import { BcryptAdapter, JWTAdapter } from '../../config';
import { envs } from '../../config/envs';
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

    const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;

    const htmlBody = `
      <h1>Validate your email</h1>
      <p>Click the link below to validate your email</p>
      <a href="${ link }">Validate email</a>
    `;  
    
    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody,
    };  

    const isEmailSent = await this.emailService.sendEmail( options );

    if( !isEmailSent ) throw CustomError.internalServer('Error sending email');


  }

  public async validateEmail( token:string ) {
    
    const payload = await JWTAdapter.verifyToken( token );
    if( !payload ) throw CustomError.badRequest('Invalid token');

    const { email } = payload as { email:string };
    if( !email ) throw CustomError.internalServer('Email not found in token');

    const user = await UserModel.findOne({ email });
    if( !user ) throw CustomError.internalServer('User with email not found');

    user.emailValidated = true;
    await user.save();

    return true;

  }

};
