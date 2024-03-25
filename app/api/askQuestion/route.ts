import { adminDb } from '@/firebaseAdmin';
import { query } from '@/lib/queryApi';
import { Message } from '@/typings';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  console.log({ data });
  
  const {
    chatId,
    model,
    prompt,
    session,
  } = data;

  if (!prompt) return NextResponse.json({ answer: 'Please add prompt message' });

  if (!chatId) return NextResponse.json({ answer: 'No valid chat provided!' });

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response.text || 'Unable to generate message',
    createdAt: new Date(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: "https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-green-background-png.png",
    }
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);
  
  return NextResponse.json({ answer: message.text });
};
