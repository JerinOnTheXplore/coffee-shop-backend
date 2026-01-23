
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'
import app from '../app';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (
    req: any,
    res: Response,
    next:NextFunction
 )=>{
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);
    if (!authHeader){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    
    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; //userId,role..//
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
 };

 
