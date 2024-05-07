"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const Settings = ({ params }) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push("/login")
  }

  return (
    <div>
      Settings page for {params.username}
    </div>
  )
}

export default Settings
