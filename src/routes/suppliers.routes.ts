import { Router } from 'express';
import { createSupplier, getSuppliers } from '../controllers/supplier.controller';

const router = Router();

router.route('/').post(createSupplier).get(getSuppliers);

router.route('/:id').get().put().delete();

export default router;
