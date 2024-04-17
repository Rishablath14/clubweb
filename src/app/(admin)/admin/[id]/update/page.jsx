"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CldUploadButton} from "next-cloudinary";
import {toast} from 'sonner'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { MemberContext } from '@/components/ContextProvider';
import { removeImagefunc } from '@/actions/members';

const Member = ({params}) => {
  const { getMembercont,updateCustomercont } = useContext(MemberContext);
  const [loading,setLoading] = useState(false);  
  const [initialData,setInitialData] = useState(null);
  const [form,setForm] = useState(null);
  useEffect(()=>{getMembercont(params.id).then((data)=>{const oneCustomer = data[0];const upbirthdate = new Date(oneCustomer?.birthDate).toISOString().split('T')[0];const upspodata = new Date(oneCustomer?.spouseBirth).toISOString().split('T')[0];const upanndata = new Date(oneCustomer?.anniversaryDate).toISOString().split('T')[0];const updata = {...oneCustomer,birthDate:upbirthdate,spouseBirth:upspodata,anniversaryDate:upanndata};setForm(updata);setInitialData(updata)})},[])   
  const handleImageUpload = (result) => {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;
      setForm(prevForm => ({...prevForm, pic: url, picId: public_id}));
    }
  };
  const removeImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastid = toast.loading("Removing Image..");
    const publicId = form.picId;
    try {
      const res = await removeImagefunc(publicId);
      if (res) {
        toast.success("Image Removed",{id:toastid});
        setForm({...form,couplePic:"",couplePicId:""});
      }
    } catch (error) {
      console.log(error);
    }finally{setLoading(false);}
  };
  const handleImageUpload2 = (result) => {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;
      setForm(prevForm => ({...prevForm, couplePic: url, couplePicId: public_id}));
    }
  };
  const removeImage2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastid = toast.loading("Removing Image..");
    const publicId = form.couplePicId;
    try {
      const res = await removeImagefunc(publicId);
      if (res) {
        toast.success("Image Removed",{id:toastid});
        setForm({...form,couplePic:"",couplePicId:""});
      }
    } catch (error) {
      console.log(error);
    }finally{setLoading(false);}
  };

  const handleUpdate = async (e)=>{
    e.preventDefault();
    const toastid = toast.loading("Updating...");
    if(!form.pic&&!form.couplePic){toast.error("Upload Pictures to continue..",{id:toastid});return}
    if(initialData===form){toast.info("No Changes to Update",{id:toastid});return}
    setLoading(true);
    try{
      console.log(form);  
      const dataup = {id:params.id,...form};
      console.log(dataup);
      await updateCustomercont(params.id,dataup);
      toast.success("Member Updated Successfully",{id:toastid});
    }catch(e){console.log("error",e)}finally{setLoading(false)}
  }
  if(!form) return <div className='flex justify-center items-center min-h-[calc(100vh-96px)]'>Loading...</div>
  return (
    <div className='flex flex-col w-full min-h-[calc(100vh-96px)] items-center justify-center p-2 md:p-8'>
    <h1 className='text-xl font-semibold mb-8'>Member Details</h1>
    <form onSubmit={handleUpdate} className='grid gap-8 grid-cols-1 sm:grid-cols-2 place-items-center w-full'>
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950 w-full'>Member's Full Name<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' autoFocus type='text' placeholder='Enter your Full Name' value={form.fullName} onChange={(e)=>{setForm({...form,fullName:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Mobile Number<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='number' placeholder='Enter your Mobile No.' value={form.mobileNum} onChange={(e)=>{setForm({...form,mobileNum:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Email ID<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='email' placeholder='Enter your Email Id' value={form.emailId} onChange={(e)=>{setForm({...form,emailId:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Address (Residence)<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='text' placeholder='Enter your Address' value={form.address} onChange={(e)=>{setForm({...form,address:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Office Address<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='text' placeholder='Enter your Office Address' value={form.officeAddress} onChange={(e)=>{setForm({...form,officeAddress:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Date of Birth<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='date' placeholder='Enter your Birth Date' value={form.birthDate} onChange={(e)=>{setForm({...form,birthDate:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Name of Spouse<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='text' placeholder='Enter your Spouse Name' value={form.spouseName} onChange={(e)=>{setForm({...form,spouseName:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Mobile Number(Spouse)<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='number' placeholder='Enter your Spouse Number' value={form.spouseNum} onChange={(e)=>{setForm({...form,spouseNum:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Date of Birth(Spouse)<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='date' placeholder='Enter your Spouse Birth Date' value={form.spouseBirth} onChange={(e)=>{setForm({...form,spouseBirth:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Wedding Anniversary Date<span className='text-red-600'>*</span></Label>
    <Input className='mt-2 w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='date' placeholder='Enter your Anniversary Date' value={form.anniversaryDate} onChange={(e)=>{setForm({...form,anniversaryDate:e.target.value})}} required/>
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Upload Member's Photo<span className='text-red-600'>*</span></Label>
    <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`h-48 w-full border-2 mt-4 border-dotted grid place-items-center bg-slate-100 dark:bg-zinc-900 rounded-md relative ${
            form.pic && "pointer-events-none"
          }`}
          onSuccess={handleImageUpload}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>

          {form.pic && (
            <Image
              src={form.pic}
              fill
              className="absolute object-cover inset-0"
              alt="Profile Photo"
            />
          )}
        </CldUploadButton>

        {form.picId && (
          <button
            onClick={removeImage}
            className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4"
          >
            Remove Image
          </button>
        )}
    </div>    
    <div className='w-full'>
    <Label className='bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Upload Couple Photo<span className='text-red-600'>*</span></Label>
    <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`h-48 w-full border-2 mt-4 border-dotted grid place-items-center bg-slate-100 dark:bg-zinc-900 rounded-md relative ${
            form.couplePic && "pointer-events-none"
          }`}
          onSuccess={handleImageUpload2}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>

          {form.couplePic && (
            <Image
              src={form.couplePic}
              fill
              className="absolute object-cover inset-0"
              alt="Couple Photo"
            />
          )}
        </CldUploadButton>

        {form.couplePicId && (
          <button
            onClick={removeImage2}
            className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4"
          >
            Remove Image
          </button>
        )}
    </div>    
    <button type='submit' disabled={loading} className='w-full col-span-1 sm:col-span-2 p-2 mt-6 bg-black hover:bg-zinc-900 text-white rounded-md dark:bg-slate-50/90 dark:hover:bg-slate-100/80 dark:text-black'>Update</button>
    </form>
    </div>
  )
}

export default Member