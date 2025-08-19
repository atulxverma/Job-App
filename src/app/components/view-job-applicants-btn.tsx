//@ts-nocheck
import { Badge, Button, Card, Dialog } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react"
import { Applications, Company, Openings, User } from "../../../generated/prisma";
import { UserContext } from "../(group)/layout";
import { JobWithCompany } from "@/lib/types";

export default function ViewJobApplicants({ job } : {job : JobWithCompany}) {
    const {user} = useContext(UserContext)
    const [applicants, setApplicants] = useState<Applications & {user : User}[]>([])
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getApplicants() {
            const res = fetch("/api/applicants/" + job.id);
            const data = (await res).json();
            setIsLoading(true)

            if (data?.success) {
                setApplicants(data?.data)
            }
            setIsLoading(false)
        }
        getApplicants();
    }, [])
    if(user?.company.id !== job.company.id){
        return null;
    }
    async function  handleDelete(id :String) {
        try{
            const resp = await fetch("/api/applicants/" + id , {
                method : "DELETE"
            })
        }
    }
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>View Applicants</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Job Applicants</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Check the people who’ve applied for the job.
                </Dialog.Description>

                <div>
                    {applicants.length > 0 ? (
                        applicants.map((application) => {
                            return (
                                <Card key={application.id}>
                                    <Badge>{application.user.email}</Badge>
                                </Card>

                            )
                        })
                    ) : (
                        <p>No applicants yet.</p>
                    )}
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}