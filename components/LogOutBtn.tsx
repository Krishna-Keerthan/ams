"use client"
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

interface LogOutBtnProps {
  className?: string
}

const LogOutBtn = ({className}: LogOutBtnProps) => {
  return (
    <Button onClick={() => signOut()} variant="destructive" className={` justify-center items-center cursor-pointer ${className}`}>Logout</Button>
  )
}

export default LogOutBtn