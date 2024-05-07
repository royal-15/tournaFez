import Link from 'next/link';
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const TournamentCard = () => {
  return (
    <div className="w-[320px] p-2 my-2 bg-white border border-gray-200 text-[20px] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href="#">
        <img className="rounded-t-lg " width={300} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4N3DLqs4-GsMx7ZHZwOkTIsOm_k8LUWl4vQ&s" alt="game image" />
      </Link>
      <div className="flex flex-col gap-2 px-2 py-1 items-center">

        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white"><Link href="#">Noteworthy technology acquisitions 2021</Link></h5>

        <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology</p>

        <button className="relative mt-2 inline-flex w-fit items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative flex items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Register Now <FaArrowRightLong />
          </span>
        </button>
      </div>
    </div>
  )
}

export default TournamentCard
