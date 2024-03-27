'use client'

import { fireStoreDB } from '@/firebase';
import { Message } from '@/typings';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import OpenAiModelSelection from '../OpenAiModelSelection';
import useSWR from 'swr';

type Props = {
  chatId: string;
}

const ChatInput = ({
  chatId
}: Props) => {
  const [messagePrompt, setMessagePrompt] = useState<string>('');
  const { data: sessionData } = useSession();

  const { data: model } = useSWR('models', {
    fallbackData: 'gpt-3.5-turbo-instruct'
  });
  
  const sendPromptMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Begin!');

    if (!messagePrompt) return;

    const message = messagePrompt.trim();
    setMessagePrompt('');
    console.log('Begin 2!');

    const messagePayload: Message = {
      text: message,
      createdAt: serverTimestamp(),
      user: {
        _id: sessionData?.user?.email!,
        name: sessionData?.user?.name!,
        avatar: sessionData?.user?.image!
          || `https://ui-avatars.com/api/?name=${sessionData?.user?.name}`
      },
    };

    const doc = await addDoc(
      collection(
        fireStoreDB, 'users', sessionData?.user?.email!, 'chats', chatId, 'messages'
      ),
      messagePayload,
    );

      
    // Notification
    const notification = toast.loading('Thinking...');

    // Loading
    const res = await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatId,
        model,
        prompt: message,
        session: sessionData
      })
    });
    const resJson = await res.json();
    console.log({ resJson });
    // Success
    toast.success('Responded!', {
      id: notification,
    });
  };
  
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm m-2">
      <form
        onSubmit={sendPromptMessage}
        className="p-2 space-x-5 flex"
      >
        <input
          type="text"
          value={messagePrompt}
          className="bg-transparent px-2 focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessagePrompt(e.target.value)}
          placeholder="Type your message..."
        />

        <button
          disabled={!messagePrompt || !sessionData}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-3 py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <OpenAiModelSelection />
      </div>
    </div>
  )
}

export default ChatInput;