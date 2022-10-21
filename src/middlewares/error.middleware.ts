// import { NextFunction, Request, Response } from 'express';
// import CustomError from '../errors/CustomError';

// const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   console.error('error', err);
//   const { status, message } = err as CustomError;

//   const statusNumber = Number(status);

//   res.status(statusNumber || 500).json({
//     // code: err.code || 'undefinedError',
//     message,
//   });
// };

// export default errorMiddleware;

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import CustomError from '../errors/CustomError';

const errorMiddleware: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  console.error(err);
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const { status, message } = err as CustomError;

  const statusNumber = Number(status);

  res.status(statusNumber || 500).json({
    // code: err.code || 'undefinedError',
    message,
  });
};

export default errorMiddleware;
