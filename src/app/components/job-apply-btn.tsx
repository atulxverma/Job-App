'use client'
import { Button } from "@radix-ui/themes"
import { SendIcon } from "lucide-react"

export default function JobApplyButton({job}){
    async function handleSubmit(){
        try{
            const res = await fetch("/api/job/apply" + job?.id);
            const data = await res.json();

            if (data.success){
                alert("Applied Successfully")
            } else {
                alert("Something went wrong")
            }
        } catch(err){

        }
    }
    return(
        <Button onClick={handleSubmit} size="3">
        <SendIcon size={16} />
        Apply
        </Button>
    )
}