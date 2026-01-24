
import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'

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
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    }; //userId,role..//
    console.log("Decoded user:", decoded);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
 };

 
