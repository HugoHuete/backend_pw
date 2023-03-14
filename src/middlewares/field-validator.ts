import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldValidator = (req:Request, res:Response, next:NextFunction) => {
  // Check the errors returned by 'check' of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json(errors);
  }
  return next();
};