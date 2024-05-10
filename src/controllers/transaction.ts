import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

import { validateRequestBody } from '../functions/shared';
import { transaction } from '../functions/transaction';

export const postTransaction: RequestHandler = async (req, res, next) => {
  try {
    validateRequestBody(validationResult(req));
    if (req.body.type === "deposit") {
      const depositResponse = transaction(req.body.amount, req.body.destination, "deposit");
      res.status(201).json(depositResponse);
    } else if (req.body.type === "withdraw") {
      const withdrawResponse = transaction(req.body.amount, req.body.origin, "withdraw");
      res.status(201).json(withdrawResponse);
    } else {
      const transferResponse = transaction(req.body.amount, req.body.origin, "transfer", req.body.destination);
      res.status(201).json(transferResponse);
    }
  } catch (err: any) {
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  };
};