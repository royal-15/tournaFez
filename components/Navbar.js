"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showProfileMenu, setshowProfileMenu] = useState(false)

  return (
    <nav className='flex justify-between items-center py-1 md:w-[88vw] w-[94vw] mx-auto'>
      <Link href="/"><img className='w-[30%] shadow-md bg-transparent' src="logo.png" alt="" /></Link>
      <div className='flex gap-5 justify-center items-center'>
        <ul className='flex gap-2 md:gap-4 items-center'>
          <li><Link href="/games">Games</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {session ?
          <div tabIndex={0} className="flex bg-gray-800 rounded-full md:me-0 cursor-pointer relative" onClick={() => setshowProfileMenu(!showProfileMenu)} onBlur={() => {
            setTimeout(() => {
              setshowProfileMenu(false);
            }, 100);
          }}>
            <img className="sm:w-12 w-10 sm:h-12 h-10 rounded-full" src={session.user.image} alt="profile image" />
            <div className={`z-10 ${!showProfileMenu && 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow sm:w-44 w-40 dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-[120%]`}>

              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link href={`/profile/${session.user.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Profile</Link>
                </li>
                <li>
                  <Link href={`/settings/${session.user.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                </li>
                <li>
                  <Link href={`/dashboard/${session.user.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
              </ul>
              <div className="py-2" onClick={() => signOut()}>
                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
              </div>
              <div className="absolute -top-1.5 right-[12px] transform -translate-x-1/2 rotate-45 w-3 h-3 bg-gray-600 border-none rounded-sm"></div>
            </div>
          </div>

          : <Link href="/login"><button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-center me-2 text-sm sm:px-5 px-3 sm:py-2.5 py-2 mb-2">
            Login</button></Link>}
      </div>

    </nav >
  );
}

export default Navbar
