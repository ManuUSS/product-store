import { type Request, type Response } from 'express';
import { type UploadedFile } from 'express-fileupload';

import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';


export class FileUploadController {

  constructor(
    private readonly fileService:FileUploadService
  ){};

  private handleError = ( error:unknown, res:Response ) => {

    if( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    } 

    return res.status(500).json({ error: 'Internal server error' });

  } 

  uploadFile = ( req:Request, res:Response ) => {

    const type = req.params.type;    
    const file = req.body.files[0] as UploadedFile;

    this.fileService.uploadSingle( file, `uploads/${ type }` )
      .then( ( uploaded ) => res.json( uploaded ) )
      .catch( ( error ) => this.handleError( error, res ) );
  }

  uploadMultipleFiles = ( req:Request, res:Response ) => {
    
    const type = req.params.type;  
    const file = req.body.files as UploadedFile[];

    this.fileService.uploadMultiple( file, `uploads/${ type }` )
      .then( ( uploaded ) => res.json( uploaded ) )
      .catch( ( error ) => this.handleError( error, res ) );

  }

};