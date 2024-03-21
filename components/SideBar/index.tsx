'use client'

import React from 'react';
import NewChat from '../NewChat';
import { signOut, useSession } from 'next-auth/react';

const SideBar = () => {
  const { data: sessionData } = useSession();
  
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div>
            {/* Modal Selection */}
          </div>

          {/* Map for ChatRows */}
        </div>
      </div>

      {
        sessionData && (
          <img
            onClick={() => signOut()}
            src={sessionData.user?.image!}
            alt="Profile pic"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          />
        )
      }
    </div>
  );
};

export default SideBar;
