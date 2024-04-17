"use client"
import DataTableDemo from '@/components/Dashboard'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-full min-h-[calc(100vh-96px)] p-2 md:p-8 flex justify-center items-center'>
    <DataTableDemo/>
    </div>
  )
}

export default Dashboard