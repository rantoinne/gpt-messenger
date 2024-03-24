import { fireStoreDB } from '@/firebase';
import { PlusIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const NewChat = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  
  const initialiseNewChat = async () => {
    const doc = await addDoc(
      collection(
        fireStoreDB,
        'users',
        sessionData?.user?.email!,
        'chats'
      ), {
        // messages: [],
        userId: sessionData?.user?.email!,
        createdAt: serverTimestamp(),
      },
    );
    router.push(`/chat/${doc.id}`);
  };
  
  return (
    <div
      role="button"
      onClick={initialiseNewChat}
      className="border-gray-700 border button-row"
    >
      <PlusIcon className="h-4 w-4 mr-2" />
      New Chat
    </div>
  );
};

export default NewChat