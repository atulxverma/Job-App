//@ts-nocheck
import Jobcard from "@/app/components/cards/job-card";
import { getUserFromCookies } from "@/lib/helper"
import prismaClient from "@/services/prisma"
import { Heading } from "@radix-ui/themes";

export default async function Page(){
    const user = await getUserFromCookies();

    if(!user) {
        return <div>User not found</div>
    }
    const applications = await prismaClient.applications.findMany({
        where : {
            user_id : user?.id
        },
        include : {
            job : {
                include : {
                    company : true
                }
            }
        }
    });

    if(!applications.length) {
        return <div>No Applications found!!</div>
    }

    return (
        <div className="px-20">
           <Heading>Your Applications :</Heading>
           <div className="flex flex-col gap-5 px-10"> 
            {
                applications.map((appl)=>{
                    return <Jobcard key={appl.id} job={appl}/>
                        // <div key={appl.id}>
                        //     <h2>{appl.job.title}</h2>
                        // </div>
                    
                })
            }
           </div>
        </div>
    )
}