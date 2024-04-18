"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CldUploadButton} from "next-cloudinary";
import {toast} from 'sonner'
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import { MemberContext } from '@/components/ContextProvider';
import { removeImagefunc } from '@/actions/members';

const Member = () => {
  const { addCustomercont } = useContext(MemberContext);
  const [loading,setLoading] = useState(false);  
  const [form,setForm] = useState({
  fullName:"",
  mobileNum:"",
  address:"",
  officeAddress:"",
  birthDate:"",
  emailId:"",
  spouseName:"",
  spouseBirth:"",
  spouseNum:"",
  anniversaryDate:"",
  pic:"",
  picId:"",
  couplePic:"",
  couplePicId:""
  })  
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
        setForm({...form,pic:"",picId:""});
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
  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    if(!form.pic&&!form.couplePic){toast.error("Upload Pictures to continue..");return}
    const toastid = toast.loading("Saving Data..");
    await addCustomercont(form);
    toast.success("Data Saved Successfully",{id:toastid});
    setForm({fullName:"",
    mobileNum:"",
    address:"",
    officeAddress:"",
    birthDate:"",
    emailId:"",
    spouseName:"",
    spouseBirth:"",
    spouseNum:"",
    anniversaryDate:"",
    pic:"",
    picId:"",
    couplePic:"",
    couplePicId:""})
  }
  console.log(form);
  return (
    <div className='flex flex-col w-full min-h-[calc(100vh-96px)] items-center justify-center p-2 md:p-8'>
     <div className='w-full text-center mb-4'>
        <span className='text-blue-800 font-bold  text-xl sm:text-3xl text-center relative'>Rotary Club Of Raigarh Royale<span className='absolute top-6 sm:top-8 right-0 text-xs sm:text-sm text-yellow-500'>(Dist. 3261)</span></span>
     </div>  
    <h1 className='text-sm mt-2 md:mt-0 md:text-xl font-semibold mb-8'>Member Data collection form for year 2024-25</h1>
    <form onSubmit={handleSubmit} className='grid gap-8 grid-cols-1 sm:grid-cols-2 place-items-center w-full'>
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
    <button type='submit' disabled={loading} className='w-full col-span-1 sm:col-span-2 p-2 mt-6 bg-black hover:bg-zinc-900 text-white rounded-md dark:bg-slate-50/90 dark:hover:bg-slate-100/80 dark:text-black'>Submit</button>
    </form>
    </div>
  )
}

export default Member