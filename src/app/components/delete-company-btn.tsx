// //@ts-nocheck
// import { Button } from '@radix-ui/themes';
// import React, { useContext } from 'react'
// import { UserContext } from '../(group)/layout';

// export default function DeleteCompanyButton({id}) {
//     const { user } = useContext(UserContext)
//     async function handleDelete(){
//         const res = await fetch("/api/company/"+id, {
//             method : "POST"
//         })
//         const data = await res.json();
//         if(data.success){
//             alert("Company deleted")
//         }
//     }
//     if(id != user?.company?.id) return null;
//   return (
//     <Button onClick={handleDelete}>
//         Delete Company
//     </Button>
//   )
// }







"use client";

import { Button } from "@radix-ui/themes";
import React, { useContext } from "react";
import { UserContext } from "../(group)/layout";

export default function DeleteCompanyButton({ id }) {
  const { user } = useContext(UserContext);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this company?")) return;

    const res = await fetch("/api/company/" + id, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      alert("Company deleted");
      window.location.href = "/";
    } else {
      alert(data.message || "Failed to delete company");
    }
  }

  if (id !== user?.company?.id) return null;

  return <Button onClick={handleDelete}>Delete Company</Button>;
}
