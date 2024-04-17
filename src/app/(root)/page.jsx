"use client"
import Link from 'next/link'
import React from 'react'

const Welcome = () => {
  return (
    <div className='w-full min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-blue-500 to-orange-400 dark:to-blue-500 dark:from-orange-400'>
      <div className='w-[95%] md:w-[85%] shadow-lg my-2 xl:my-0 bg-white dark:bg-zinc-900 p-4 md:px-12 md:py-6 rounded-lg'>
        <div className='w-full text-center mb-4'>
        <span className='text-blue-800 font-bold  text-xl sm:text-3xl text-center relative'>Rotary Club Of Raigarh Royale<span className='absolute top-6 sm:top-8 right-0 text-xs sm:text-sm text-yellow-500'>(Dist. 3261)</span></span>
        </div>
        <h2 className='mb-4 font-bold text-2xl sm:text-3xl text-center text-gray-800 dark:text-gray-100'>
          A Warm Welcome to All Our Esteemed Members
        </h2>
        <p className='my-2 text-base sm:text-lg text-black font-semibold dark:text-white text-justify'>
          We (team 2024-2025) are thrilled and grateful to join hands with present and past teams, along with the visionary senior members of Rotary Club of Raigarh Royale. Together, we aim to continue the genuine intent and impactful actions of "Service Above Self" practiced since the club's inception.
        </p>
        <p className='my-2 text-base sm:text-lg text-black font-semibold dark:text-white text-justify'>
          We seek the kind cooperation and support of all our esteemed members. As a close-knit family and team, we will keep walking closer towards our greater resolve of service and fellowship.
        </p>
        <p className='my-2 text-base sm:text-lg text-black font-semibold dark:text-white text-justify'>
          To kickstart our effort to create a magical year for everyone, we kindly request you to fill in the form on the next page.
        </p>
        <h3 className='mt-4 text-xl font-bold text-center text-black dark:text-gray-100'>Thanks and Warm Regards</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          <div className='border border-gray-200 dark:border-gray-600 p-4 rounded-lg text-center'>
            <b className='text-lg'>Ashish Mahamia</b>
            <p className='text-black font-semibold dark:text-white'>President 2024-2025</p>
          </div>
          <div className='border border-gray-200 dark:border-gray-600 p-4 rounded-lg text-center'>
            <b className='text-lg'>Ankit Agrawal</b>
            <p className='text-black font-semibold dark:text-white'>Secretary 2024-2025</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center mt-4'>
          <p className='text-sm sm:text-base font-semibold mb-2 text-black dark:text-white animate-bounce'>Kindly fill the Members Data on Next page..</p>
          <button className='py-3 px-8 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors'>
            <Link href='/member'>Go to Next Page</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome