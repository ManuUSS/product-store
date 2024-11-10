import { gen} from 'bcryptjs';

export class BcryptAdapter {


  static hash( password:string ) {

    const salt = bcrypt.genSaltSync(10);

  };

}


