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
 












"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../layout";

export default function AddJobPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const router = useRouter();
  const user = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title: jobTitle,
      type: jobType,
      location: jobLocation,
      description: jobDescription,
      company: {
        name: companyName,
        website: companyWebsite,
      },
      userId: user?.id || "",
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (res.ok) {
        alert("Job added successfully!");
        router.push("/");
      } else {
        alert("Failed to add job.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 py-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-center">Add New Job</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Enter job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Job Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Job Location
          </label>
          <input
            type="text"
            placeholder="Location"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Job Description
          </label>
          <textarea
            placeholder="Write job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Company Website
          </label>
          <input
            type="url"
            placeholder="https://example.com"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
