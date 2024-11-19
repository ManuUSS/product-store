import path from 'path';
import fs from 'fs';
import { type UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain';


export class FileUploadService {


  constructor(
    private readonly uuid = Uuid.v4
  ){};


  private checkFolder( folderPath:string ){
    if( !fs.existsSync( folderPath ) ){
      fs.mkdirSync( folderPath );
    }
  };

  public async uploadSingle( 
    file:UploadedFile, 
    folder:string = 'upload', 
    validExtensions:string[] = ['png', 'jpg', 'jpeg', 'gif']
  ){

    try {
      const fileExtension = file.mimetype.split('/').at( 1 ) ?? '';

      if( !validExtensions.includes( fileExtension ) ){
        throw CustomError.badRequest(
          'Invalid file extension, valid ones are: ' + validExtensions.join(',')
        );
      }

      const destination = path.resolve( __dirname, '../../../upload/', folder );
      this.checkFolder( destination );

      const fileName = `${ this.uuid() }.${ fileExtension }`;

      file.mv( `${ destination }/${ fileName }` );

      return { fileName };

    } catch ( error ) {
      throw error;
    }


  };

  public uploadMultiple(
    file:UploadedFile[], 
    folder:string = 'upload', 
    validExtensions:string[] = ['png', 'jpg', 'jpeg', 'gif']
  ){

  };

};


