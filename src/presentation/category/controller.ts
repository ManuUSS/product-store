import { type Request, type Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';


export class CategoryController {

  constructor(){};

  private handleError = ( error:unknown, res:Response ) => {

    if( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    } 

    return res.status(500).json({ error: 'Internal server error' });

  } 

  createCategory = async ( req:Request, res:Response ) => {

    const [ error, categoryDto ] = CreateCategoryDto.create( req.body );

    if( error ) return this.handleError( new CustomError(400, error), res );

    res.json('createCategory');
  }

  getCategories = async ( req:Request, res:Response ) => {
    res.json('createCategory');
  }

};