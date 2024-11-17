import { type Request, type Response } from 'express';
import { CreateCategoryDto, CustomError, PaginationDto } from '../../domain';


export class ProductController {

  constructor(
    // private readonly productService:ProductService
  ){};

  private handleError = ( error:unknown, res:Response ) => {

    if( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    } 

    return res.status(500).json({ error: 'Internal server error' });

  } 

  createProduct = ( req:Request, res:Response ) => {

    const [ error, categoryDto ] = CreateCategoryDto.create( req.body );

    if( error ) return this.handleError( new CustomError(400, error), res );

    res.json({ message: 'Product created' });

  }

  getProducts = ( req:Request, res:Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );

    if( error ) return this.handleError( new CustomError(400, error), res );

    res.json({ message: 'Products' });

  }

};