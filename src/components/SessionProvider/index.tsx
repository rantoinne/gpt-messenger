'use client'

import { Session } from "next-auth";
import { SessionProvider as SProvider } from "next-auth/react";
import React from "react";

type Props = {
  session: Session | null;
  children: React.ReactNode;
}

const SessionProvider = ({
  session,
  children,
}: Props) => {
  return (
    <SProvider>
      {children}
    </SProvider>
  );
};

export default SessionProvider;
