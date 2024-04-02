import type { Metadata } from "next";

import "./globals.css";
import SideBar from "@/components/SideBar";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "GPT Messenger",
  description: "Interface to interact with GPT models",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {/* TODO: Wrap below component */}
          {
            session ? (
              <div className="flex">
                <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                  <SideBar />
                </div>
                
                <ClientProvider />
                <div className="flex-1 bg-[#343541]">
                  {children}
                </div>
              </div>
            ) : (
              <Login />
            )
          }
        </SessionProvider>
      </body>
    </html>
  );
}
