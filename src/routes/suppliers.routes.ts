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
  [
    check('name', 'El nombre tiene que ser un string no vacío.')
      .isString()
      .custom(supplierNameExists)
      .withMessage('Proveedor ya existe'),
    check('status', 'No se debe incluir el campo status.').isEmpty(),
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
