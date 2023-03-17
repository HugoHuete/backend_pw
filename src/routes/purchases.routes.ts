import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidator } from '../middlewares';
import { supplierIdExists } from '../helpers';
import { createPurchase } from '../controllers/purchase.controller';

const router = Router();

// router.get('/');

router.post(
  '/',
  [
    check(['id', 'status'], 'No incluir los campos "id" y "status".').isEmpty(),
    check(['date', 'received_date'], 'La fecha es requerida.')
      .notEmpty()
      .withMessage('Formato de fecha incorrecta.')
      .isDate(),
    check('supplier_id', 'El id del proveedor es requerido.')
      .isNumeric()
      .withMessage('No hay ningun proveedor con ese id.')
      .custom(supplierIdExists),
    check('purchase_link', 'Tiene que ser una URL').isURL(),
    check('comment', 'Tiene que ser de tipo texto').isString(),
    fieldValidator,
  ],
  createPurchase,
);

// router.get();
// router.put();
// router.delete();

export default router;
