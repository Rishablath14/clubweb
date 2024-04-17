"use server"

import dbConnect from "@/utils/dbConnect";
import Members from "@/utils/userSchema";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllMembers = async()=>{
    await dbConnect();
    const member = await Members.find();
    if(!member) return null;
    const data = JSON.parse(JSON.stringify(member))
    return data;
}
export const addMember = async (cust) => {
    try{
        await dbConnect();
        const member = new Members(cust);
        const save = await member.save();
        const data = JSON.parse(JSON.stringify(save));
        return data;
        }
        catch(e){
            console.log("error",e);
            return false
        }
}
export const deleteMember = async (id) => {
    try{
        await dbConnect();
        const member = await Members.deleteOne({_id:id});
        if(member.deletedCount>0) return true
        else return false
    }
    catch(e){
        console.log("error",e);
    }
}
export const removeImagefunc = async (publicId) => {
    try {
      await cloudinary.v2.uploader.destroy(publicId);
      return true;
    } catch (error) {
      return false;
    }
  };
export const updateMember = async (data) => {
    const {id,...rest} = data;
    try{
    await dbConnect();
    const member = await Members.updateOne(
      { _id:id},
      { $set: {...rest} }
    );
    if(member.modifiedCount>0) {
        const data = {_id:id,...rest}
        return data;
    }
    else return null
}
catch(e){
    console.log("error",e);
}
}





