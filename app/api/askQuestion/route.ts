import { adminDb } from '@/firebaseAdmin';
import { createImage, query } from '@/lib/queryApi';
import { Message } from '@/typings';
import { NextResponse } from 'next/server';
import { CompletionChoice } from 'openai/resources/completions.mjs';

// Refactor and modularise
export async function POST(request: Request) {
  const data = await request.json();
  
  const {
    chatId,
    model,
    prompt,
    session,
    generateImage = false,
  } = data;

  if (!prompt) return NextResponse.json({ answer: 'Please add prompt message!' });

  if (!chatId) return NextResponse.json({ answer: 'No valid chat provided!' });

  let response;
  if (generateImage) {
    response = await createImage(prompt, model);
  } else {
    response = await query(prompt, model);
  }

  const message: Message = {
    text: generateImage
      ? (response as string)
      : ((response as CompletionChoice).text || 'Unable to generate message'),
    createdAt: new Date(),
    type: generateImage ? 'IMAGE' : 'TEXT',
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: "https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-green-background-png.png",
    }
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email!)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);
  
  return NextResponse.json({ answer: message.text });
};
