// // @ts-nocheck
// "use client";

// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import { Button } from "@radix-ui/themes";
// import { UserCircleIcon } from "lucide-react";
// import Link from "next/link";
// import { useContext } from "react";
// import { UserContext } from "../(group)/layout";
// import { useRouter } from "next/navigation";

// export default function UserDropDown({ user }) {
//   const router = useRouter();
//   // const {user} = useContext(UserContext)
//   const handleLogout = async () => {
//     try {
//       await fetch("/api/logout", { method: "POST" });
//       router.refresh();
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <DropdownMenu.Root>
//       <DropdownMenu.Trigger asChild>
//         <Button className="cursor-pointer">
//           <UserCircleIcon className="w-8 h-8 text-white" />
//         </Button>
//       </DropdownMenu.Trigger>

//       <DropdownMenu.Portal>
//         <DropdownMenu.Content
//           className="bg-white text-black border shadow-xl rounded-md p-2 w-48 z-[9999]"
//           sideOffset={8}
//           align="end"
//         >
//           {user?.company && (
//             <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
//               <Link href="/add-job">Add a new Company</Link>
//             </DropdownMenu.Item>
//           )}
//           {user?.company && (
//             <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
//               <Link href={"/company/" + user.company.id}>View Company</Link>
//             </DropdownMenu.Item>
//           )}
//           {user?.company && (
//             <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
//               <Link href="/add-job">Add a new Job</Link>
//             </DropdownMenu.Item>
//           )}

//           {user?.role == "Admin" && (
//             <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
//               <Link href="/add-job">Add a new Job</Link>
//             </DropdownMenu.Item>
//           )}

//           <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
//             <Link href="/login">Login</Link>
//           </DropdownMenu.Item>

//           <DropdownMenu.Separator className="my-1 border-t border-gray-200" />

//           <DropdownMenu.Item
//             className="p-2 hover:bg-gray-100 rounded-md text-red-500"
//             onClick={handleLogout}>
//             Logout
//           </DropdownMenu.Item>

//           <DropdownMenu.Item className="p-2 text-red-500 hover:bg-red-100 rounded-md">
//             Delete Account
//           </DropdownMenu.Item>
//         </DropdownMenu.Content>
//       </DropdownMenu.Portal>
//     </DropdownMenu.Root>
//   );
// }










// @ts-nocheck
"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@radix-ui/themes";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserDropDown({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isLoggedIn = !!user;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button className="cursor-pointer">
          <UserCircleIcon className="w-8 h-8 text-white" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white text-black border shadow-xl rounded-md p-2 w-48 z-[9999]"
          sideOffset={8}
          align="end"
        >
          {isLoggedIn && (
            <>
              {user?.role === "Admin" && (
                <>
                  {!user?.company && (
                    <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
                      <Link href="/add-company">Add Company</Link>
                    </DropdownMenu.Item>
                  )}

                  {user?.company && (
                    <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
                      <Link href={`/company/${user.company.id}`}>View Company</Link>
                    </DropdownMenu.Item>
                  )}
                </>
              )}

              <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
                <Link href="/add-job">Add a new Job</Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
                <Link href="/applied-jobs">Your job applications</Link>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="my-1 border-t border-gray-200" />

              <DropdownMenu.Item
                className="p-2 hover:bg-gray-100 rounded-md text-red-500"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenu.Item>

              <DropdownMenu.Item className="p-2 text-red-500 hover:bg-red-100 rounded-md">
                Delete Account
              </DropdownMenu.Item>
            </>
          )}

          {!isLoggedIn && (
            <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded-md">
              <Link href="/login">Login</Link>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}


