

export class CategoryEntity {

  constructor(
    public readonly id:string,
    public readonly name:string,
    public readonly available:boolean,
  ) {};

  static fromObject( obj:Record<string,any> ):CategoryEntity {

    const {
      id,
      _id,
      name,
      available,
    } = obj;

    if( !id && !_id ) {
      throw new Error( 'Missing category id' );
    }
    if( !name ) throw new Error( 'Missing category name' );
    if( available === undefined ) throw new Error( 'Missing category available' );

    return new CategoryEntity(
      id || _id,
      name,
      available,
    );

  }

};


