import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image';

export default function Page() {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
        <div className='h-full lg:flex flex-col justify-center items-center px-4'>
            <div className='text-center space-y-4 pt-16'>
                <h1 className='font-bold text-3xl text-[#2E2A47]'>
                    Welcome back
                    </h1>
                    <p className='text-base text-[#7E8CA0]'>
                        Log in or Create account to get to your dashboard!
                    </p>
            </div>
            <div className='flex justify-center items-center mt-8'>
              <ClerkLoaded>
                <SignUp path='/sign-up'/>
              </ClerkLoaded>
              <ClerkLoading>
                <div className='flex justify-center items-center mt-8'>
                  <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
                </div>
              </ClerkLoading>
            </div>
        </div>
        <div className='h-full bg-blue-600 hidden lg:flex justify-center items-center'>
            <Image src='/logo.svg' alt='Logo' width={300} height={300} />
        </div>
    </div>
  )
}