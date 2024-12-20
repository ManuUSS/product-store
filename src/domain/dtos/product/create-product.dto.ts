import { Validators } from "../../../config";


export class CreateProductDto {

  private constructor (
    public readonly name:         string,
    public readonly description:  string,
    public readonly available:    boolean,
    public readonly price:        number,
    public readonly user:         string, //ID
    public readonly category:     string  //ID
  ){};


  static create( obj:Record<string, any>):[ string?, CreateProductDto? ]{
    const { name, description, available, price, user, category } = obj;

    if( !name ) return [ 'Name is required' ];
    if( !description ) return [ 'Description is required' ];
    
    if( !user ) return [ 'User is required' ];
    if( !Validators.isMongoId( user ) ) return [ 'Invalid user id' ];

    if( !category ) return [ 'Category is required' ];
    if( !Validators.isMongoId( category ) ) return [ 'Invalid category id' ];
    
    return [ 
      undefined, 
      new CreateProductDto( name, description, !!available, price, user, category ) 
    ];
  }

};

