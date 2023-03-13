import { Application, Router } from 'express';
import supplierRouter from './suppliers.routes';

const routerApi = (app: Application) => {
  const router = Router();
  app.use('api/v1', router);
  router.use('/suppliers', supplierRouter);
};

export default routerApi;
