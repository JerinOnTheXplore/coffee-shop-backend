import { NextFunction, Response } from "express";


export const roleMiddleware = (...allowedRoles: string[])=> (req:any, res:Response,next: NextFunction)=>{
    if(!allowedRoles.includes(req.user.role)){
      return res.status(403).json({message: 'Forbidden access denied!!'});
    }
    next();
  }