// 'use client'
// import { FormEvent, useState } from "react";

// export default function Page(){
//     const [name , setName] = useState("");
//     const [desc , setDesc] = useState("");

//     async function handleCreate(e : FormEvent<HTMLFormElement>){
//         e.preventDefault();

//         const company = {
//             name,
//             description : desc
//         }

//         const res = await fetch("http://localhost:3000/api/company",{
//             method :"POST",
//             body : JSON.stringify({
//                 data : company
//             })
//         })
//         const data = await res.json();
//     }

//     return(
//         <div>
//             <form onSubmit={handleCreate} action="">
//                 <input className="border-1" type="text" value={name} onChange={e=>setName(e.target.value)} />
//                 <input className="border-1" type="text" value={desc} onChange={e=>setDesc(e.target.value)} />
//                 <button>Submit</button>
//             </form>
//         </div>
//     )
// }









'use client';
import { FormEvent, useState, useContext } from "react";
import { Box, Button, Text, Heading } from "@radix-ui/themes";
import { UserContext } from "../layout";

export default function Page() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { user, setUser } = useContext(UserContext);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { name, description: desc } }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Company created successfully!");

      // instantly update context so dropdown changes without refresh
      setUser({
        ...user!,
        company: data.data,
      });

      setName("");
      setDesc("");
    } else {
      alert("Company creation failed.");
    }
    console.log(data);
  }

  return (
    <Box className="max-w-md mx-auto mt-10 p-4 border rounded">
      <form onSubmit={handleCreate}>
        <Heading size="5" mb="4">Add Company</Heading>

        <Box mb="3">
          <Text as="label" size="2" weight="bold">Company Name</Text>
          <input
            placeholder="e.g. Google"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>

        <Box mb="3">
          <Text as="label" size="2" weight="bold">Description</Text>
          <input
            placeholder="e.g. Search engine giant"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </Box>

        <Button type="submit" color="blue" variant="solid">
          Submit
        </Button>
      </form>
    </Box>
  );
}
