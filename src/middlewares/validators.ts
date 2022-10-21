import { NextFunction, Request, Response } from 'express';
// import Joi = require('joi');
import CustomError from '../errors/CustomError';
// import { CarZodSchema } from '../interfaces/ICar';

const validators = {
  validateCar(req: Request, _res: Response, next: NextFunction) {
    console.log('validateCar');
    // se a requisição for vazia chama o CustomError passando o código de erro 400
    if (!req.body) {
      throw new CustomError(400, 'Request body is empty');
    }
    next();
  },
};

export default validators;
