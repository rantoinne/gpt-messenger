import { fireStoreDB } from '@/firebase';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';

type Props = {
  id: string
}

const ChatTitleRow = ({ id }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: sessionData } = useSession();
  
  const [active, setActive] = useState<boolean>(false);

  const [messages] = useCollection(
    collection(fireStoreDB, 'users', sessionData?.user?.email!, 'chats', id, 'messages'),
  );
  
  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(id));
  }, [pathName, id]);
  
  const deleteChat = async () => {
    await deleteDoc(doc(fireStoreDB, 'users', sessionData?.user?.email!, 'chats', id));
    router.replace('/');
  };
  
  return (
    <Link
      href={`/chat/${id}`}
      className={`button-row justify-center items-center ${active && 'bg-gray-700/50'} mt-2`}
    >
      <ChatBubbleLeftIcon
        className="h-5 w-5"
      />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <TrashIcon
        onClick={deleteChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
};

export default ChatTitleRow