import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .optional({ nullable: true }),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('role')
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .isString()
    .withMessage('Password is required')
    .optional({ nullable: false }),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];