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

    

    if( !req.files || Object.keys( req.files ).length === 0 ) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }

    const file = req.files.file as UploadedFile;

    this.fileService.uploadSingle( file )
      .then( ( uploaded ) => res.json( uploaded ) )
      .catch( ( error ) => this.handleError( error, res ) );
  }

  uploadMultipleFiles = ( req:Request, res:Response ) => {
  }

};