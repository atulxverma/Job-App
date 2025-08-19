//@ts-nocheck
"use client";
import { Theme } from "@radix-ui/themes";
import { createContext, useState } from "react";
import Header from "../header";

export const Context = createContext();

export default function ThemeContext({ children }) {
  const [isDark, setIsDark] = useState(true);
  return (
    <Context.Provider value={{ isDark, setIsDark }}>
      <Theme appearance={isDark ? "dark" : "light"}>
        {/* <Header/> */}
        {children}
        </Theme>
    </Context.Provider>
  );
}
