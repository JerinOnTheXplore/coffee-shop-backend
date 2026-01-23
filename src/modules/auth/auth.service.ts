import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

  const AuthService={
    register: async(name:string, email:string, password: string, role:Role = Role.CUSTOMER)=>{
        const existingUser=await prisma.user.findUnique({where:{email}});
        if(existingUser) throw new Error('email already registered!!..');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user =await prisma.user.create({
            data:{name,email,password:hashedPassword,role},
        });
        const accessToken=jwt.sign({userId:user.id,role:user.role},JWT_SECRET,{expiresIn:'15m'});
        const refreshToken=jwt.sign({userId:user.id,role:user.role},REFRESH_SECRET,{expiresIn:'7d'});

        return{
            user:{id:user.id,name:user.name,email:user.email,role:user.role},
            accessToken,
            refreshToken,
        };
    },

    login:async (email:string,password:string)=>{
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('iinvalid credentials!!');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('invalid credentials!!..');

        const accessToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id, role: user.role }, REFRESH_SECRET, { expiresIn: '7d' });

      return {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        accessToken,
        refreshToken,
       };
    },
    refreshToken:async(token:string)=>{
        try{
            const payload:any=jwt.verify(token, REFRESH_SECRET);
            const accessToken= jwt.sign({userId:payload.userId,role:payload.role},JWT_SECRET,{expiresIn:'15m'});
            return {accessToken}
        } catch{
            throw new Error('invalid refresh token!!');
        }
    },
  };