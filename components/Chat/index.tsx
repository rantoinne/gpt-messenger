'use client'

import { fireStoreDB } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import MessageText from '../MessageText';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';
import { LoaderIcon } from 'react-hot-toast';

type Props = {
  chatId: string;
}

const Chat = ({
  chatId
}: Props) => {
  const { data: sessionData } = useSession();
  
  const [messages, loading] = useCollection(sessionData && query(
    collection(fireStoreDB, 'users', sessionData.user?.email!, 'chats', chatId, 'messages'),
    orderBy('createdAt', 'asc')
  ))

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {
        loading && <LoaderIcon />
      }
      {
        messages?.empty && (
          <>
            <p className="mt-10 text-center text-white">
              Start conversation by asking anything below
            </p>
            <ArrowDownCircleIcon
              className="h-12 w-12 mx-auto mt-4 text-white animate-bounce"
            />
          </>
        )
      }
      {
        messages?.docs.map(message => (
          <MessageText
            key={message.id}
            message={message.data()}
          />
        ),
      )
      }
    </div>
  );
};

export default Chat