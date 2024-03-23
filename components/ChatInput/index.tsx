'use client'

import { fireStoreDB } from '@/firebase';
import { Message } from '@/typings';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react'

type Props = {
  chatId: string;
}

const ChatInput = ({
  chatId
}: Props) => {
  const [messagePrompt, setMessagePrompt] = useState<string>('');
  const { data: sessionData } = useSession();

  const model = 'text-davinci-003'
  
  const sendPromptMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!messagePrompt) return;

    const message = messagePrompt.trim();
    setMessagePrompt('');

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

    await addDoc(
      collection(
        fireStoreDB, 'users', sessionData?.user?.email!, 'chats', chatId, 'messages'
      ),
      messagePayload,
    );

    // Notification

    // Loading
    const res = await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: message,
        chatId,
        // model,
        session: sessionData
      })
    });
    const resJson = res.json();
    // Success
  };
  
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form
        onSubmit={sendPromptMessage}
        className="p-3 px-5 space-x-5 flex"
      >
        <input
          value={messagePrompt}
          type="text"
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
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

      <div>
        {/* Modal Selection */}
      </div>
    </div>
  )
}

export default ChatInput;