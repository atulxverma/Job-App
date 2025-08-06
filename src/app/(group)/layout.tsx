//@ts-nocheck
'use client'
import { Theme } from "@radix-ui/themes";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import Header from "../components/header";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Company, User } from "../../../generated/prisma";

// export const UserContext = createContext<{
//   user?: User & { company: Company } | null,
//   setUser?: (value: User & { company: Company }) => void
// }>();
export const UserContext = createContext<{
  user: User & { company: Company } | null;
  setUser: (value: User & { company: Company }) => void;
}>({
  user: null,
  setUser: () => { },
});


export default function Layout({ children }: { children: ReactNode }) {
  // const userCookies = cookies();
  // const token = userCookies.get("token")?.value || "";
  // const email = decodeURIComponent(token);

  // const user = await prismaClient.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });

  const [user, setUser] = useState<User & { company: Company } | null>(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("http://localhost:3000/api/current-user");
      const data = await res.json();
      console.log("Fetched user data:", data);
      if (data.success) {
        setUser(data.data.user)

      }
    }
    getUser();
  }, []);

  return (
    <div>
      <Theme>
        <UserContext.Provider value={{
          user,
          setUser
        }}>

          <Header user={user} />
          {children}
        </UserContext.Provider>
      </Theme>
    </div>
  );
}
