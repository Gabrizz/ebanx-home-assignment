import express, { ErrorRequestHandler, RequestHandler } from "express";

import accountRoutes from './routes/account';
import transactionRoutes from './routes/transaction';

const app = express();

const corsHandler: RequestHandler = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control');
  res.set('Access-Control-Max-Age', '3600');
  next();
};
app.use(corsHandler);

app.use(accountRoutes);
app.use(transactionRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, data: data });
}
app.use(errorHandler);

app.listen(3000, () => console.log('App listening on port 3000'));