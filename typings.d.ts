import { Firestore } from "firebase/firestore"

interface Message {
  text: string | undefined;
  createdAt: Firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  type?: 'IMAGE' | 'TEXT'
}