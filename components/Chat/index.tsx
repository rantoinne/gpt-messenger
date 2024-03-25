'use client'

import { fireStoreDB } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import MessageText from '../MessageText';

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
    <div className="flex-1">
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