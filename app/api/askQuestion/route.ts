import { adminDb } from '@/firebaseAdmin';
import { query } from '@/lib/queryApi';
import { Message } from '@/typings';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  console.log('Method recieved', res);
  const {
    chatId,
    model,
    prompt,
    session,
  } = req.body;

  if (!prompt)res.json({ answer: 'Please add prompt message' });

  if (!chatId)res.json({ answer: 'No valid chat provided!' });

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response.text || 'Unable to generate message',
    createdAt: new Date(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: "https://links.papareact.com/89k",
    }
  };

  // await 
  //   .collection('users')
  //   .doc(session?.user?.email)
  //   .collection('chats')
  //   .doc(chatId)
  //   .collection('messages')
  //   .add();
  
  res.send({ answer: message.text });
};

export { handler as GET, handler as POST };
