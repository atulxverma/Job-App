// @ts-nocheck
import { Avatar, Heading } from "@radix-ui/themes";
import { CircleUserRound } from "lucide-react";
import SearchInput from "./search-input";
import Link from "next/link";
import UserDropDown from "./user-drop-down";

export default function Header({ user }) {
   console.log("Header user:", user);
  return (
    <header className="p-6 sticky top-0 bg-gray-800 z-50 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-5">

          <Avatar
          size="3"
          fallback="J"
          radius="full"
          src="https://w7.pngwing.com/pngs/749/905/png-transparent-glassdoor-logo-and-symbol-review-platforms-logos.png" />
        <Heading className="text-white text-xl">GLASSDOOR</Heading>

      </Link>
      <div className="flex items-center gap-6 max-w-xl w-1/5 ml-auto">
        <SearchInput />
        <UserDropDown user={user} />
      </div>
    </header>

  );
}
