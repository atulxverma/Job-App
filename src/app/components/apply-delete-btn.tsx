'use client';

import { useState } from "react";
import JobApplyButton from "./job-apply-btn";

export default function ApplyDeleteButton({ hasApplied, job }: { hasApplied: boolean; job: any }) {
    const [userHasApplied, setUserHasApplied] = useState(hasApplied);

    async function handleDelete() {
        try {
            const res = await fetch(`/api/job/apply/${job?.id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                alert("Application deleted successfully");
                setUserHasApplied(false);
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to delete application.");
        }
    }

    return (
        <div>
            {!userHasApplied && (
                <JobApplyButton job={job} setUserHasApplied={setUserHasApplied} />
            )}
            {userHasApplied && (
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete Application
                </button>
            )}
        </div>
    );
}
