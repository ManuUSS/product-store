import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes'; 
import { ProductRoutes } from './product/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { ImagesRoutes } from './images/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/categories', CategoryRoutes.routes );
    router.use('/api/products', ProductRoutes.routes ); 
    router.use('/api/file-upload', FileUploadRoutes.routes );
    router.use('/api/images', ImagesRoutes.routes );
    return router;
  }


}

