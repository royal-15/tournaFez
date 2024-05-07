"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Dashboard = ({ params }) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push("/login")
  }

  return (
    <div>
      dashboard page of {params.username}
    </div>
  )
}

export default Dashboard
