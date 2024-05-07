"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState()
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push("/")
  }

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })
    setResult(res.status)
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  return <main className="w-[98vw] sm:h-[66vh] h-[56.6vh] flex flex-col items-center justify-center my-16 gap-4">
    <h2 className="text-2xl text-gray-100 mb-3">Login with</h2>
    <div className="w-[300px] flex flex-col items-center justify-center gap-3">
      <button onClick={() => signIn("google")} className='w-full py-3 flex items-center justify-center gap-2 bg-white text-black rounded-md'>
        <span><FcGoogle /></span>
        <span>Google</span>
      </button>
      <button onClick={() => signIn("facebook")} className='w-full py-3 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md'>
        <span><FaFacebookF /></span>
        <span>Facebook</span>
      </button>
    </div>
    <div className="mb-3 flex text-sm gap-1 w-[300px] justify-center items-center">
      <div className="h-[1px] border-[1px] border-gray-5000 w-1/3"></div>
      <span className="text-gray-500"> or </span>
      <div className="h-[1px] border-[1px] border-gray-5000 w-1/3"></div>
    </div>
    {result && result !== 200 && <span className='text-red-500'>Invalid credentials</span>}
    <form className="w-[300px] flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input {...register("email", { required: true })} type="email" id="email" name="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
        <label htmlFor="email" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
      </div>
      {errors.email && errors.email.type === 'required' && (
        <span className='text-red-500'>Email is required</span>
      )}

      <div className="relative">
        <input
          {...register("password", { required: true })}
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
        <label htmlFor="password" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
        >
          {showPassword ? <HiEyeOff /> : <HiEye />}
        </button>
      </div>
      {errors.password && errors.password.type === 'required' && (
        <span className='text-red-500'>Password is required</span>
      )}
      <button type="submit" disabled={isSubmitting} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">Login</button>
    </form>
    <div>Don&apos;t have an account? <Link className="text-blue-500 hover:underline" href="/register">Register here</Link></div>
  </main>
}

export default Login
