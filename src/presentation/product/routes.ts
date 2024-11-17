import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ProductRoutes {


  static get routes():Router {

    const router = Router();

    router.get('/', () => {} );
    router.post('/', [ AuthMiddleware.validateJWT ], () => {} );

    return router;
  }


}

