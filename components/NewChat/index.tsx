import { PlusIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const NewChat = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  
  const initialiseNewChat = async () => {

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