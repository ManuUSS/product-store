import path from 'path';
import fs from 'fs';
import { type UploadedFile } from 'express-fileupload';


export class FileUploadService {


  constructor(){};


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
      const fileExtension = file.mimetype.split('/').at( 1 );
      const destination = path.resolve( __dirname, '../../../upload/', folder );
      this.checkFolder( destination );

      
      file.mv( `${ destination }/my-file.${ fileExtension }` );

    } catch ( error ) {
      
    }


  };

  public uploadMultiple(
    file:UploadedFile[], 
    folder:string = 'upload', 
    validExtensions:string[] = ['png', 'jpg', 'jpeg', 'gif']
  ){

  };

};


