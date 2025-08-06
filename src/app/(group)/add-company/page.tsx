'use client'
import { FormEvent, useState } from "react";

export default function Page(){
    const [name , setName] = useState("");
    const [desc , setDesc] = useState("");

    async function handleCreate(e : FormEvent<HTMLFormElement>){
        e.preventDefault();

        const company = {
            name,
            description : desc
        }

        const res = await fetch("http://localhost:3000/api/company",{
            method :"POST",
            body : JSON.stringify({
                data : company
            })
        })
        const data = await res.json();
    }

    return(
        <div>
            <form onSubmit={handleCreate} action="">
                <input className="border-1" type="text" value={name} onChange={e=>setName(e.target.value)} />
                <input className="border-1" type="text" value={desc} onChange={e=>setDesc(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}