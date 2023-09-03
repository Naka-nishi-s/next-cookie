'use client'

import { User, UserContextType } from "@/types/User";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<UserContextType>({ user: { name: "", email: "" }, setUser: () => { } });

export const UserProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User>({ name: "Tanaka", email: "sample@gmailgmail" });
  const userInfo = {
    user,
    setUser
  }

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  )

}
