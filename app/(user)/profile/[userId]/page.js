"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

const Profile = ({ params }) => {
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) {
    router.push("/login")
    return null
  }

  return <>
    <main className='mx-20 my-10 border border-red-200 rounded-2xl min-h-40'>
      <div className='border border-red-50 relative rounded-t-2xl min-h-[100px]'>
        <Image
          src="https://static.vecteezy.com/system/resources/thumbnails/017/188/879/small/geometric-dark-background-with-gradient-shapes-composition-good-for-posters-design-illustration-vector.jpg"
          alt="Background image"
          width={100}
          height={100}
          quality={100}
          loading="lazy"
          className='w-full h-[200px] rounded-t-2xl'
        />
        <div className="rounded-full absolute bottom-[-50px] left-[50px] border-[4px] border-gray-300">
          <Image
            src={session.user.image}
            alt="Profile image"
            width={100}
            height={100}
            quality={100}
            loading="lazy"
            className='rounded-full'
          />
        </div>
      </div>
      {/* details */}
      <div className='px-[52px] pt-[54px] bg-slate-950 rounded-b-2xl pb-8'>
        <h3 className='text-xl'>{session.user.name}</h3>
      </div>
    </main>
  </>
}

export default Profile
