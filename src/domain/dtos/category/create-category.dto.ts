

export class CreateCategoryDto {

  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly available: boolean,
  ) {};

  static create( obj:Record<string, any> ): [ string?, CreateCategoryDto? ] {

    const { name, description, available = true } = obj;
    let availableBoolean = available;

    if (!name) return ['Name is required'];
    if (!description) return ['Description is required'];
    if ( typeof available !== 'boolean' ) {
      availableBoolean = ( available === 'true' );
    };

    return [ undefined, new CreateCategoryDto( name, description, availableBoolean ) ];


  };


};