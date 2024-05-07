"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState()
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push("/")
  }

  const onSubmit = async (data) => {
    const r = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const res = await r.text()
    setResult({ success: r.status === 201, text: res })
    // console.log(data, res);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  return (
    <main className="w-[98vw] sm:h-[66vh] h-[56.6vh] flex flex-col items-center justify-center my-16 gap-4">
      <h2 className="text-2xl text-gray-100 mb-3">Register</h2>
      <form className="w-[300px] flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        {result && <span className={result.success ? `text-green-500` : `text-red-500`}>{result.text}</span>}
        <div className="relative">
          <input {...register("email", { required: true, maxLength: 24 })} type="email" id="email" name="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
          <label htmlhtmlFor="email" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
        </div>
        {errors.email && errors.email.type === 'required' && (
          <span className='text-red-500'>email is required</span>
        )}

        <div className="relative">
          <input
            {...register("password", { required: true, minLength: 6, maxLength: 16 })}
            type={showPassword ? "text" : "password"}
            name="password"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
          <label htmlhtmlFor="password" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
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
        {errors.password && errors.password.type === 'minLength' && (
          <span className='text-red-500'>Password must be at least 6 characters</span>
        )}

        <div className="relative">
          <input
            {...register('confirmPassword', { required: true, validate: (val) => val === watch('password') })}
            name='confirmPassword'
            type={showPassword ? "text" : "password"}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-md border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
          <label htmlhtmlFor="confirmPassword" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm Password</label>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500">Passwords do not match</span>
        )}
        <button type="submit" disabled={isSubmitting} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">Register</button>
      </form>
      <div>Already have an account? <Link className="text-blue-500 hover:underline" href="/login">Login here</Link></div>
    </main>
  )
}

export default Register
