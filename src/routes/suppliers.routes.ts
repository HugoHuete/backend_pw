import { Router } from 'express';
import { createSupplier, getSuppliers, getSupplier, updateSupplier } from '../controllers';

const router = Router();

router.route('/').post(createSupplier).get(getSuppliers);

router.route('/:id').get(getSupplier).put(updateSupplier).delete();

export default router;
