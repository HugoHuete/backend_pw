import { Router } from 'express';
import { body, check } from 'express-validator';
import { fieldValidator } from '../middlewares';
import {
  SupplierControllers 
} from '../controllers';
import { supplierIdExists, supplierNameNotExists } from '../helpers';

const router = Router();
const supplier = new SupplierControllers();

router.get('/', supplier.findAll);
router.get('/:id', [check('id').custom(supplierIdExists), fieldValidator], supplier.findById);
router.get('/:id/purchases', [check('id').custom(supplierIdExists), fieldValidator], supplier.getPurchases);

router.post(
  '/',
  [
    check('name').custom(supplierNameNotExists),
    check('status', 'No se debe incluir el campo status.').isEmpty(),
    fieldValidator,
  ],
  supplier.create,
);

router.put(
  '/:id',
  [
    body('id', 'El id no se puede actualizar.').isEmpty(),
    check('id').custom(supplierIdExists),
    check('name').optional().custom(supplierNameNotExists),
    check('status', 'El status tiene que ser de tipo booleano.').optional().isBoolean(),
    fieldValidator,
  ],
  supplier.update,
);

router.delete('/:id', [check('id').custom(supplierIdExists), fieldValidator], supplier.deactivate);

export default router;
