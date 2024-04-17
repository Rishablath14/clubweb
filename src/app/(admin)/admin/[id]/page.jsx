"use client"
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import Link from 'next/link'
import { MemberContext } from "@/components/ContextProvider";
import Image from "next/image";



const page = ({params}) => {
  const { getMembercont, members, deleteCustomercont } = useContext(MemberContext);
  const router = useRouter();
  const [member, setMember] = useState(null);
  useEffect(()=>
  {
  const getData = async()=>{
  const data = await getMembercont(params.id);
  setMember(data[0]);
  }
  getData();
  },[params.id,members])
  const formattedDate = (date)=>{
    const udate = new Date(date);
    const formattedDate = `${udate.getDate()} / ${udate.getMonth() + 1} / ${udate.getFullYear()}`;
    return formattedDate;
  }
  const handleDelete = async()=>{
    const toastid = toast.loading("Deleting..");
    try {
      await deleteCustomercont(params.id);
      toast.success('Member deleted successfully!',{id:toastid});
      router.push("/admin/dashboard");
    } catch (error) {
      console.error('Error deleting member', error);
      toast.error('An error occurred while deleting member!',{id:toastid});
    }
  }
  if(!member) return <div className='w-full min-h-[calc(100vh-96px)] flex justify-center items-center'>Loading...</div>
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="pb-4 flex justify-start items-center">
        <Link href="/admin/dashboard">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" /> Back to Members
          </Button>
        </Link>
        { member &&
        <>
        <Link href={`/admin/${params.id}/update`} className='mx-1 md:mx-2'>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </Link>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </>
          }
      </div>
      {member ? (
        <div>
          <div className="bg-white dark:bg-slate-900 dark:text-white shadow overflow-auto sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Personal Information</h3>
            </div>
            <div className="border-t border-slate-800 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                {member.fullName!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{member?.fullName}</dd>
                </div>}
                {member.mobileNum>0 && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile No.</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{member?.mobileNum}</dd>
                </div>}
                {member.emailId!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{member?.emailId}</dd>
                </div>}
                {member.birthDate!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Birth Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formattedDate(member?.birthDate)}</dd>
                </div>}
                {member.address!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{member?.address}</dd>
                </div>}
                {member.officeAddress!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{member?.officeAddress}</dd>
                </div>}
              </dl>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 dark:text-white shadow overflow-auto sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Other Information</h3>
            </div>
            <div className="border-t border-slate-800 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
              {member.spouseName!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Spouse Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{member?.spouseName}</dd>
                </div>}
              {member.spouseNum>0 && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Spouse Mobile No.</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{member?.spouseNum}</dd>
                </div>}
                {member.spouseBirth!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Spouse Birth Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formattedDate(member?.spouseBirth)}</dd>
                </div>}
                {member.anniversaryDate!=='' && <div className='sm:col-span-1'>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Anniversary Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formattedDate(member?.anniversaryDate)}</dd>
                </div>}
                {member.pic!=='' && <div className='sm:col-span-1'>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile Photo</dt>  
                <dd className="mt-1 text-sm text-gray-900 dark:text-white"><a href={member.pic} download={`${member.fullName}_profile`}><Image src={member.pic} alt="Profile Photo" width={300} height={300}/></a></dd>
                </div>}
                {member.couplePic!=='' && <div className='sm:col-span-1'>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile Photo</dt>  
                <dd className="mt-1 text-sm text-gray-900 dark:text-white"><Image src={member.couplePic} alt="Couple Photo" width={300} height={300}/></dd>
                </div>}
              </dl>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-196px)]">No member found</div>
      )}
    </div>
  );
}
 
export default page


