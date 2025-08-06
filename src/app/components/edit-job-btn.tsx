'use client'

import { Button, Dialog, Flex, Select, TextField } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { UserContext } from "../(group)/layout";
import { Openings } from "../../../generated/prisma";

export default function EditJobBtn({job} : {job : Openings}){

    const [jobTitle, setJobTitle] = useState(job?.title || "");
      const [jobDescription, setJobDescription] = useState(job?.description || "");
      const [jobLocation, setJobLocation] = useState(job?.location || "");
      const [jobSalary, setJobSalary] = useState(`${job?.salary} || ""`);
      const [jobCategory, setJobCategory] = useState(job?.job_type || "");
      const { user }= useContext(UserContext);
      const [jobType, setJobType] = useState(job?.employment_type || "");
      const [loading, setLoading] = useState(false);
    
      async function handleSubmit() {
        setLoading(true);
    
        const salaryNum = Number.parseInt(jobSalary);
    
        const data = {
          title: jobTitle,
          description: jobDescription,
          salary: salaryNum,
          job_type: jobCategory,
          employment_type: jobType,
          location: jobLocation,
          company_id : user.company.id
        };
    
        const res = await fetch("http://localhost:3000/api/job", {
          method: "POST",
          body: JSON.stringify(data)
          
        });
    
        const resData = await res.json();
        if(resData.success){
            alert("Job Created")
        }
    
        setLoading(false);
      }

<Dialog.Root>
	<Dialog.Trigger>
		<Button>Edit job</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Edit Job</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			Make changes to your posted job.
		</Dialog.Description>

		<Flex direction="column" gap="3">
			<div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">

        <Flex direction="column" gap="4">
          <TextField.Root>
            <TextField.Input
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </TextField.Root>

          <TextField.Root>
            <TextField.Input
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </TextField.Root>

          <div className="flex gap-4">
            <TextField.Root className="flex-1">
              <TextField.Input
                placeholder="Job Location"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
              />
            </TextField.Root>

            <TextField.Root className="flex-1">
              <TextField.Input
                placeholder="Job Salary"
                value={jobSalary}
                onChange={(e) => setJobSalary(e.target.value)}
              />
            </TextField.Root>
          </div>

          <Select.Root value={jobType} onValueChange={setJobType}>
            <Select.Trigger className="bg-white px-4 py-2 border rounded">
              <Select.Value placeholder="Select Employment Type" />
            </Select.Trigger>
            <Select.Content className="bg-white rounded shadow">
              <Select.Item value="full-time">Full-time</Select.Item>
              <Select.Item value="part-time">Part-time</Select.Item>
              <Select.Item value="freelance">Contractor</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root value={jobCategory} onValueChange={setJobCategory}>
            <Select.Trigger className="bg-white px-4 py-2 border rounded">
              <Select.Value placeholder="Select Job Category" />
            </Select.Trigger>
            <Select.Content className="bg-white rounded shadow">
              <Select.Item value="tech">Tech</Select.Item>
              <Select.Item value="marketing">Marketing</Select.Item>
              <Select.Item value="design">Design</Select.Item>
            </Select.Content>
          </Select.Root>

          <Button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Edit Job"}
          </Button>
        </Flex>
    </div>
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>
}
