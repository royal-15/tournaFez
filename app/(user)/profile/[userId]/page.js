"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Profile = ({ params }) => {
  const router = useRouter()
  const { data: session } = useSession()

  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div>
      Profile page of {params.userId}
    </div>
  )
}

export default Profile
