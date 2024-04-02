'use client'
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Login = () => {
  const onSignIn = async () => {
    await signIn('google');
  };
  
  return (
    <div className="flex flex-col bg-[#000000] h-screen items-center justify-center text-center">
      <div className="flex flex-col bg-[#11A37F] py-8 px-28 rounded-2xl justify-center items-center space-y-8">
        <Image
          alt="gpt-messenger-logo"
          src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-green-background-png.png"
          width={180}
          height={180}
        />
        <button
          onClick={onSignIn}
          className="text-white font-bold text-3xl animate-pulse"
        >
          Let&apos;s Start
        </button>
      </div>
    </div>
  );
};

export default Login