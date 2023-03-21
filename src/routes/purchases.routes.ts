import { Router } from 'express';
import { body, check, query } from 'express-validator';

import { fieldValidator } from '../middlewares';
import { PurchaseControllers } from '../controllers';

const router = Router();
const purchase = new PurchaseControllers();

router.get(
  '/',
  [
    query('supplier', 'Supplier id must be type integer.').optional().isInt(),
    query(['startDate', 'endDate'], 'Dates must be in format "yyyy-mm-dd".').optional().isDate(),
    fieldValidator,
  ],
  purchase.findAll,
);

router.post(
  '/',
  [
    check('id', 'Id must not be included.').isEmpty(),
    check(['date', 'received_date'], 'Date is required.')
      .exists()
      .withMessage('Date format must be "yyyy-mm-dd".')
      .isDate(),
    check('supplier_id', 'Supplier id is required.')
      .exists()
      .withMessage('Supplier id must be type integer.')
      .isInt(),
    check('status', 'Permited values are: Pending or Received')
      .optional()
      .isIn(['Pending', 'Received']),
    check('exchange_rate', 'Exchange rate must be numeric').optional().isNumeric(),
    check('purchase_link', 'Purchase link must be a URL.').optional().isURL(),
    check('comment', 'Comment must be a string.').optional().isString(),
    fieldValidator,
  ],
  purchase.create,
);

router.get(
  '/:id',
  [check('id', 'Purchase id must be type integer.').isInt(), fieldValidator],
  purchase.findById,
);

router.put(
  '/:id',
  [
    body('id', 'Purchase id cannot be updated.').isEmpty(),
    check('id', 'Purchase id must be an integer.').isInt(),
    check(['date', 'received_date'], 'Date format must be "yyyy-mm-dd".').optional().isDate(),
    check('supplier_id', 'Supplier id must be type integer.').isInt(),
    check('status', 'Permited values are: Pending or Received')
      .optional()
      .isIn(['Pending', 'Received']),
    check('exchange_rate', 'Exchange rate must be numeric').optional().isNumeric(),
    check('purchase_link', 'Purchase link must be a URL.').optional().isURL(),
    check('comment', 'Comment must be a string.').optional().isString(),
    fieldValidator,
  ],
  purchase.update,
);

router.delete(
  '/:id',
  [check('id', 'Purchase id must be type integer.').isInt(), fieldValidator],
  purchase.deactivate,
);

export default router;
