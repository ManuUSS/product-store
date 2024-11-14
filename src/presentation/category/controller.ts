import { type Request, type Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
import { CategoryService } from '../services/category.service';


export class CategoryController {

  constructor(
    private readonly categoryService:CategoryService
  ){};

  private handleError = ( error:unknown, res:Response ) => {

    if( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    } 

    return res.status(500).json({ error: 'Internal server error' });

  } 

  createCategory = ( req:Request, res:Response ) => {

    const [ error, categoryDto ] = CreateCategoryDto.create( req.body );

    if( error ) return this.handleError( new CustomError(400, error), res );

    this.categoryService.createCategory( categoryDto!, req.body.user )
      .then( category => res.status( 201 ).json( category ) )
      .catch( error => this.handleError( error, res ) );

  }

  getCategories = ( req:Request, res:Response ) => {

    this.categoryService.getCategories()
      .then( categories => res.status( 200 ).json( categories ) )
      .catch( error => this.handleError( error, res ) );

  }

};