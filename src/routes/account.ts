import { Router } from 'express';
import { query } from 'express-validator';

import { resetDatabase } from '../db';
import { getAccountBalance } from '../controllers/account';

const router = Router();

router.get('/balance', [
  query('account_id').exists()
    .withMessage('Query parameter <account_id> not found')
], getAccountBalance);

router.post('/reset', (req, res, next) => {
  resetDatabase();
  res.status(200).send('OK');
});

export default router;