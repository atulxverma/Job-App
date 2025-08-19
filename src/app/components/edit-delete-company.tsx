'use client'
import React, { useContext } from 'react'
import { UserContext } from '../(group)/layout'
import { Button } from '@radix-ui/themes';
import EditJobBtn from './edit-job-btn';

export default function EditDeleteCompany({ job }) {

    async function handleDelete() {
        try {
            const res = await fetch("/api/job/" + job.id, { method: "DELETE" });

            if (!res.ok) {
                alert("Something went wrong");
                return;
            }

            let data: any = {};
            if (res.status !== 204) {
                data = await res.json();
            }

            if (data.success || res.status === 204) {
                alert("Job deleted successfully");
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    const { user } = useContext(UserContext);
    if (user?.company?.id == job?.company?.id) {
        return (
            <div>
                <Button onClick={handleDelete} color='red'>Delete</Button>
                <EditJobBtn job={job} />
            </div>
        )
    } else return null;

}
