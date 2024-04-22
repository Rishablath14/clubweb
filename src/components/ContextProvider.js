"use client"
import { createContext, useState, useEffect } from 'react';
import { addMember, deleteMember, getAllMembers, removeImagefunc, updateMember } from '@/actions/members';

export const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState(null);
  
  const fetchMembers = async () => {
    const data = await getAllMembers();
    setMembers(data);
  };
  useEffect(() => {
    fetchMembers();
  }, []);
  
  const addCustomercont = async (customerData) => {
    await addMember(customerData);
    fetchMembers();
  };

  const getMembercont = async (id) => {
    return members.filter((cust)=>cust._id===id)
  };

  const updateCustomercont = async (id, updatedData) => {
    const data = await updateMember(updatedData);
    setMembers(
      members.map((customer) =>
        customer._id === id ? { ...customer, ...data } : customer
      )
    );
  };

  const deleteCustomercont = async (id) => {
    const onemem = members.filter((cust)=>cust._id===id);
    const res = await removeImagefunc(onemem[0].picId);
    const res2 = await removeImagefunc(onemem[0].couplePicId);
    const del = await deleteMember(id);
    if(del){
        setMembers(members.filter((customer) => customer._id !== id));
    }
  };

  return (
    <MemberContext.Provider
      value={{ members,addCustomercont,getMembercont,updateCustomercont, deleteCustomercont }}
    >
      {children}
    </MemberContext.Provider>
  );
};
