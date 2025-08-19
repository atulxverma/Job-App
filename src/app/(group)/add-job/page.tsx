// //@ts-nocheck
// "use client";

// import {
//   Button,
//   Card,
//   Flex,
//   Heading,
//   Select,
//   TextField,
// } from "@radix-ui/themes";
// import React, { useContext, useState } from "react";
// import { UserContext } from "../layout";

// export default function AddJobPage() {
//   const [jobTitle, setJobTitle] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [jobLocation, setJobLocation] = useState("");
//   const [jobSalary, setJobSalary] = useState("");
//   const [jobCategory, setJobCategory] = useState("");
//   const {user }= useContext(UserContext);
//   const [jobType, setJobType] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit() {
//     setLoading(true);

//     const salaryNum = Number.parseInt(jobSalary);

//     const data = {
//       title: jobTitle,
//       description: jobDescription,
//       salary: salaryNum,
//       job_type: jobCategory,
//       employment_type: jobType,
//       location: jobLocation,
//       company_id : user.company.id
//     };

//     const res = await fetch("http://localhost:3000/api/job", {
//       method: "POST",
//       body: JSON.stringify(data)
      
//     });

//     const resData = await res.json();
//     if(resData.success){
//         alert("Job Created")
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
//       <Card className="w-full max-w-xl p-6 shadow-md">
//         <Heading size="6" className="mb-6 text-center">
//           Add a new Job
//         </Heading>

//         <Flex direction="column" gap="4">
//           <TextField.Root>
//             <TextField.Input
//               placeholder="Job Title"
//               value={jobTitle}
//               type="text"
//               onChange={(e) => setJobTitle(e.target.value)}
//             />
//           </TextField.Root>

//           <TextField.Root>
//             <TextField.Input
//               placeholder="Job Description"
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//             />
//           </TextField.Root>

//           <div className="flex gap-4">
//             <TextField.Root className="flex-1">
//               <TextField.Input
//                 placeholder="Job Location"
//                 value={jobLocation}
//                 onChange={(e) => setJobLocation(e.target.value)}
//               />
//             </TextField.Root>

//             <TextField.Root className="flex-1">
//               <TextField.Input
//                 placeholder="Job Salary"
//                 value={jobSalary}
//                 onChange={(e) => setJobSalary(e.target.value)}
//               />
//             </TextField.Root>
//           </div>

//           <Select.Root value={jobType} onValueChange={setJobType}>
//             <Select.Trigger className="bg-white px-4 py-2 border rounded">
//               <Select.Value placeholder="Select Employment Type" />
//             </Select.Trigger>
//             <Select.Content className="bg-white rounded shadow">
//               <Select.Item value="full-time">Full-time</Select.Item>
//               <Select.Item value="part-time">Part-time</Select.Item>
//               <Select.Item value="contractor">Contractor</Select.Item>
//             </Select.Content>
//           </Select.Root>

//           <Select.Root value={jobCategory} onValueChange={setJobCategory}>
//             <Select.Trigger className="bg-white px-4 py-2 border rounded">
//               <Select.Value placeholder="Select Job Category" />
//             </Select.Trigger>
//             <Select.Content className="bg-white rounded shadow">
//               <Select.Item value="on-site">On-site</Select.Item>
//               <Select.Item value="remote">Remote</Select.Item>
//               <Select.Item value="hybrid">Hybrid</Select.Item>
//             </Select.Content>
//           </Select.Root>

//           <Button
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Adding..." : "Add Job"}
//           </Button>
//         </Flex>
//       </Card>
//     </div>
//   );
// }
 












// @ts-nocheck
"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../layout";
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  TextArea,
  TextField,
} from "@radix-ui/themes";

export default function AddJobPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [jobCategory, setJobCategory] = useState("On-Site");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddJob = async () => {
    if (
      !jobTitle ||
      !jobType ||
      !jobCategory ||
      !jobLocation ||
      !jobDescription ||
      !jobSalary
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!user?.company?.id) {
      alert("Company not found.");
      return;
    }

    const salaryNum = parseInt(jobSalary);
    if (isNaN(salaryNum)) {
      alert("Invalid salary");
      return;
    }

    const data = {
      title: jobTitle,
      description: jobDescription,
      salary: salaryNum,
      job_type: jobCategory,
      employment_type: jobType,
      location: jobLocation,
      company_id: user.company.id,
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Job added successfully!");
        router.push("/");
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong while adding job");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="max-w-xl mx-auto mt-10 p-6">
      <Heading as="h1" size="5" mb="5" align="center">
        Add New Job
      </Heading>

      <Flex direction="column" gap="4">
        <label>
          Job Title
          <TextField.Root
            placeholder="e.g. Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </label>

        <label>
          Job Category
          <Select.Root value={jobCategory} onValueChange={setJobCategory}>
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="On-Site">On-Site</Select.Item>
              <Select.Item value="Remote">Remote</Select.Item>
              <Select.Item value="Hybrid">Hybrid</Select.Item>
            </Select.Content>
          </Select.Root>
        </label>

        <label>
          Employment Type
          <Select.Root value={jobType} onValueChange={setJobType}>
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Full-Time">Full-Time</Select.Item>
              <Select.Item value="Part-Time">Part-Time</Select.Item>
              <Select.Item value="Contract">Contract</Select.Item>
              <Select.Item value="Internship">Internship</Select.Item>
            </Select.Content>
          </Select.Root>
        </label>

        <label>
          Location
          <TextField.Root
            placeholder="e.g. Bengaluru, India"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
          />
        </label>

        <label>
          Salary
          <TextField.Root
            type="number"
            placeholder="e.g. 80000"
            value={jobSalary}
            onChange={(e) => setJobSalary(e.target.value)}
          />
        </label>

        <label>
          Job Description
          <TextArea
            placeholder="Describe the job role and responsibilities"
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </label>

        <Button onClick={handleAddJob} disabled={loading}>
          {loading ? "Adding..." : "Add Job"}
        </Button>
      </Flex>
    </Card>
  );
}
