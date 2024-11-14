

export class PaginationDto {

  private constructor (
    public readonly page: number,
    public readonly limit: number,
  ) {};

  static create( page:number = 10, limit:number = 10 ): [ string?, PaginationDto? ] {

    if( isNaN( page ) || isNaN( limit ) ) return [ 'Page or limit must be valid numbers' ];

    if( page < 1 ) return [ 'Page must be greater than 0' ];
    if( limit < 1 ) return [ 'Limit must be greater than 0' ];

    return [ undefined, new PaginationDto( page, limit ) ];

  }

};


