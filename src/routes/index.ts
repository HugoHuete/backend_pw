import { Application, Router } from 'express';
import supplierRouter from './suppliers.routes';
import purchaseRouter from './purchases.routes';

const routerApi = (app: Application) => {
  const router = Router();
  app.use('/api/v1', router);

  router.use('/suppliers', supplierRouter);
  router.use('/purchases', purchaseRouter);
};

export default routerApi;
