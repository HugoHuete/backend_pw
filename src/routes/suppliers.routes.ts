import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidator } from '../middlewares';
import {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers';
import { supplierIdExists, supplierNameExists } from '../helpers';

const router = Router();

router.get('/', getSuppliers);

router.post(
  '/',
  [ check(['id', 'status'], 'No incluir los campos "id" y "status".').isEmpty(),
    check('name', 'El nombre tiene que ser un string no vacío.')
      .isString()
      .withMessage('Proveedor ya existe')
      .custom(supplierNameExists),
    fieldValidator,
  ],
  createSupplier,
);

router.get(
  '/:id',
  [check('id', 'El id de ese proveedor no existe').custom(supplierIdExists), fieldValidator],
  getSupplier,
);

router.put(
  '/:id',
  [
    check('id', 'El id tiene que ser de tipo número.').isNumeric(),
    check('name', 'El nombre tiene que ser un string no vacío.')
      .optional()
      .isString()
      .custom(supplierNameExists)
      .withMessage('Ya existe un proveedor con ese nombre.'),
    check('status', 'El status tiene que ser de tipo booleano.').optional().isBoolean(),
    fieldValidator,
  ],
  updateSupplier,
);

router.delete(
  '/:id',
  [check('id', 'El id tiene que ser de tipo número.').isNumeric(), fieldValidator],
  deleteSupplier,
);

export default router;
