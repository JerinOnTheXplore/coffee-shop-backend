import { AuthService } from "./auth.service";
import { Request, Response } from "express";


export const AuthController={
    register: async (req:Request, res:Response)=>{
        try{
            const {name,email,password,role}= req.body;
            const data =await AuthService.register(name,email,password,role);
            res.status(201).json({success:true,data});
        } catch (err:any){
            res.status(400).json({success:false, message: err.message});
        }
    },

    login: async (req:Request,res:Response)=>{
        try{
            const {email,password}= req.body;
            const data =await AuthService.login(email,password);
            res.status(200).json({success:true,data});
        }catch(err:any) {
            res.status(400).json({success:false,message: err.message});
        }
    },

    refreshToken: async(req:Request,res:Response) =>{
        try{
           const {token}= req.body;
           const data = await AuthService.refreshToken(token);
           res.status(200).json({success:true,data});
        } catch(err:any) {
           res.status(401).json({success:false,message:err.message});
        }
    }
}