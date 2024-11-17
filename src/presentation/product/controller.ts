import { type Request, type Response } from 'express';
import { CustomError, PaginationDto, CreateProductDto } from '../../domain';
import { type ProductService } from '../services/product.service';


export class ProductController {

  constructor(
    private readonly productService:ProductService
  ){};

  private handleError = ( error:unknown, res:Response ) => {

    if( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    } 

    return res.status(500).json({ error: 'Internal server error' });

  } 

  createProduct = ( req:Request, res:Response ) => {

    const [ error, createProductDto ] = CreateProductDto.create( req.body );

    if( error ) return this.handleError( new CustomError(400, error), res );

    this.productService.createProduct( createProductDto! )
      .then( product => res.json({ product }) )
      .catch( error => this.handleError( error, res ) );

  }

  getProducts = ( req:Request, res:Response ) => {

    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( +page, +limit );

    if( error ) return this.handleError( new CustomError(400, error), res );

    this.productService.getProducts( paginationDto! )
      .then( products => res.json( products ) )
      .catch( error => this.handleError( error, res ) );

  }

};