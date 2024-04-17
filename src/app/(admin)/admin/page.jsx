"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {toast} from 'sonner'
import {Eye,EyeOff} from 'lucide-react'
import { loginAdmin } from '@/actions/admin';

const login = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [pass,setPass] = useState(false);
  const [form,setForm] = useState({
    username:"",
    password:""
  })
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const toastlo = toast.loading("Login Check...")
            setLoading(true);
            const response = await loginAdmin(form.username,form.password);
            if(response){
            toast.success("Login success",{
              id:toastlo
            });
            setLoading(false);
            window.location.reload();
          }else{
            toast.error("Invalid Credentials",{
              id:toastlo
            });
            setLoading(false);
          }
  }
  const handleClick = ()=>{setPass(!pass)}
  return (
    <div className='w-full min-h-[calc(100vh-96px)] flex justify-center items-center'>
      <form className='w-[90%] md:w-[60%] p-4 md:p-8 flex flex-col rounded-md shadow-lg border border-black dark:border-white' onSubmit={handleSubmit}>
      <div className='w-full text-center mb-4'>
        <span className='text-blue-800 font-bold  text-xl sm:text-3xl text-center relative'>Rotary Club Of Raigarh Royale<span className='absolute top-6 sm:top-8 right-0 text-xs sm:text-sm text-yellow-500'>(Dist. 3261)</span></span>
      </div>
       <h1 className='font-bold text-xl my-6'>Admin Login</h1> 
       <label className='mb-2 bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Username</label>
       <input className='w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type='text' placeholder='Enter your username' value={form.username} onChange={(e)=>{setForm({...form,username:e.target.value})}} required/>
       <label className='mt-4 mb-2 bg-slate-50 rounded-md p-1 dark:bg-zinc-950'>Password</label>
       <input className='w-full p-1 border dark:border-white dark:bg-zinc-950 border-black' type={pass?"text":"password"} placeholder='Enter Your password' value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}} required/>
       <span className='mt-2' onClick={handleClick}>{pass?<EyeOff />:<Eye />}</span>
       <button type='submit' disabled={loading} className='p-2 mt-6 bg-black hover:bg-zinc-900 text-white rounded-md dark:bg-slate-50/90 dark:hover:bg-slate-100/80 dark:text-black'>Login</button>
      </form>
    </div>
  )
}

export default login