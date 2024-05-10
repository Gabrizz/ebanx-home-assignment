import { Router } from 'express';
import { body } from 'express-validator';
import bodyParser from "body-parser";

import { postTransaction } from '../controllers/transaction';

const router = Router();

router.post('/event', bodyParser.json(), [
  body('amount').isFloat({gt:0})
    .withMessage('The field <amount> must be a number greater than zero'),
  body('type').isIn(['deposit', 'withdraw', 'transfer'])
    .withMessage('The field <type> must be one of the following strings: deposit, withdraw or transfer'),
  body('origin').custom((value, { req }) => {
    if ((req.body.type === 'withdraw' || req.body.type === 'transfer') && typeof value !== 'string') {
      return false;
    }
    return true;
  }).withMessage('The field <origin> is a required string for this transaction <type>'),
  body('destination').custom((value, { req }) => {
    if ((req.body.type === 'deposit' || req.body.type === 'transfer') && typeof value !== 'string') {
      return false;
    }
    return true;
  }).withMessage('The field <destination> is a required string for this transaction <type>')
], postTransaction);

export default router;