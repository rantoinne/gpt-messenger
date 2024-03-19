'use client'
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Login = () => {
  const onSignIn = async () => {
    await signIn('google');
  };
  
  return (
    <div className="flex flex-col bg-[#11A37F] h-screen items-center justify-center text-center">
      <Image
        alt="gpt-messenger-logo"
        src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-green-background-png.png"
        width={300}
        height={300}
      />
      <button
        onClick={onSignIn}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign in to use GPT-messenger
      </button>
    </div>
  );
};

export default Login