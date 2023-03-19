import { Router } from 'express';
import { check } from 'express-validator';

import { fieldValidator } from '../middlewares';
import { PurchaseControllers } from '../controllers';
import { supplierIdExists } from '../helpers';

const router = Router();
const purchase = new PurchaseControllers();

router.get('/', purchase.findAll);

router.post(
  '/',
  [
    check('id', 'No incluir el campo "id".').isEmpty(),
    check(['date', 'received_date'], 'La fecha es requerida.')
      .notEmpty()
      .withMessage('Formato de fecha incorrecta.')
      .isDate(),
    check('supplier_id').custom(supplierIdExists),
    check('purchase_link', 'Tiene que ser una URL').optional().isURL(),
    check('comment', 'Tiene que ser de tipo texto').optional().isString(),
    fieldValidator,
  ],
  purchase.create,
);

router.get('/:id', [], purchase.findById);

router.put('/:id', [], purchase.update);

// router.delete();

export default router;
