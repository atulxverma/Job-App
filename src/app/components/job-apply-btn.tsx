'use client'
import { Button } from "@radix-ui/themes";
import { SendIcon } from "lucide-react";

export default function JobApplyButton({ job, setUserHasApplied }) {
    async function handleSubmit() {
        try {
            const res = await fetch(`/api/job/apply/${job?.id}`, { method: "POST" });

            let data = {};
            try {
                data = await res.json();
            } catch {
                throw new Error("Invalid JSON response from server");
            }

            if (data.success) {
                alert("Applied Successfully");
                setUserHasApplied(true);
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to apply. Please try again.");
        }
    }

    return (
        <Button onClick={handleSubmit} size="3">
            <SendIcon size={16} />
            Apply
        </Button>
    );
}
