'use client'

import React from 'react';
import NewChat from '../NewChat';
import { signOut, useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { fireStoreDB } from '@/firebase';
import ChatTitleRow from '../ChatTitleRow';
import OpenAiModelSelection from '../OpenAiModelSelection';

const SideBar = () => {
  const { data: sessionData } = useSession();

  const [data, loading, error] = useCollection(
    sessionData && query(
      collection(fireStoreDB, 'users', sessionData.user?.email!, 'chats'),
      orderBy('createdAt', 'asc'),
    ),
  );
  
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
            <OpenAiModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Chats are loading...</p>
              </div>
            )}
          </div>
          {/* Map for ChatRows */}
          {
            data?.docs.map(chat => (
              <ChatTitleRow
                key={chat.id}
                id={chat.id}
              />
            ))
          }
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
