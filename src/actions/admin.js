"use server"

import Admin from "@/utils/adminSchema";
import dbConnect from "@/utils/dbConnect";
import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

export const loginAdmin = async (username,password) => 
{
    await dbConnect();
    const admin = await Admin.findOne({username})
    if(!admin) return false;
    const correct = password===admin.password;
    if(!correct){
        return false;
    }
    const tokenData = {
        id: admin._id,
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
    cookies().set("token", token, {
        httpOnly: true,
    })
    return true;
}

export const logoutAdmin = async () => 
{
  cookies().delete("token");
}
