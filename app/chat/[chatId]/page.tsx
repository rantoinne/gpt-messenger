import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'
import React from 'react'

type Props = {
  params: {
    chatId: string;
  };
}

const ChatPage = ({
  params: { chatId }
}: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={chatId} />
      <ChatInput chatId={chatId} />
    </div>
  )
}

export default ChatPage