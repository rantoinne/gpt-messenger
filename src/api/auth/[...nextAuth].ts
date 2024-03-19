import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

console.log({ process: process.env.GOOGLE_ID });

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    // TODO: extend process TS
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};

export default NextAuth(authOptions);
