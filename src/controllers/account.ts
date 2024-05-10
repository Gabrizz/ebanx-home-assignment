import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

import { validateRequestBody } from '../functions/shared';
import { fetchAmountByAccountId } from '../functions/account';

export const getAccountBalance: RequestHandler = async (req, res, next) => {
  try {
    validateRequestBody(validationResult(req));
    const amount = fetchAmountByAccountId(req.query.account_id as string);
    res.status(200).json(amount);
  } catch (err: any) {
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  };
};