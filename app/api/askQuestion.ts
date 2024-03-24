import { adminDb } from '@/firebaseAdmin';
import { query } from '@/lib/queryApi';
import { Message } from '@/typings';
import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  name: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const {
    chatId,
    model,
    prompt,
    session,
  } = req.body;

  if (!prompt) res.status(400).json({ answer: 'Please add prompt message' });

  if (!chatId) res.status(400).json({ answer: 'No valid chat provided!' });

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response.text || 'Unable to generate message',
    createdAt: adminDb.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: "https://links.papareact.com/89k",
    }
  };

  await adminDb()
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);
  
  res.status(200).json({ answer: message.text });
};

export default handler;
