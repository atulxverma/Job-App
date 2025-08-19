"use client";
import { Button, Card, RadioGroup, Slider, Text } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterSideBar() {
  const searchParams = useSearchParams();
  const jt = searchParams.get("jt");
  const et = searchParams.get("et");
  const q = searchParams.get("q");
  const ms = Number(searchParams.get("ms") || 100000);

  const router = useRouter();

  const [jobType, setJobType] = useState(jt || "remote");
  const [employmentType, setEmploymentType] = useState(et || "full-time");
  const [minSalary, setMinSalary] = useState(ms);

  function handleSubmit() {
    const url = `/search?q=${q}&jt=${jobType}&et=${employmentType}&ms=${minSalary}`;
    router.push(url);
  }

  return (
    <div className="w-72 space-y-6">

      <Card className="p-4 space-y-3 shadow-md">
        <Text className="font-semibold text-gray-700 mb-2">Job Type</Text>
        <RadioGroup.Root value={jobType} onValueChange={setJobType} className="flex flex-col gap-2">
          <RadioGroup.Item
            value="remote"
            className={`px-3 py-2 cursor-pointer ${
              jobType === "remote" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Remote
          </RadioGroup.Item>
          <RadioGroup.Item
            value="on-site"
            className={`px-3 py-2 cursor-pointer ${
              jobType === "on-site" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            On-site
          </RadioGroup.Item>
          <RadioGroup.Item
            value="hybrid"
            className={`px-3 py-2 cursor-pointer ${
              jobType === "hybrid" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Hybrid
          </RadioGroup.Item>
        </RadioGroup.Root>
      </Card>

      <Card className="p-4 space-y-3 shadow-md">
        <Text className="font-semibold text-gray-700 mb-2">Employment Type</Text>
        <RadioGroup.Root value={employmentType} onValueChange={setEmploymentType} className="flex flex-col gap-2">
          <RadioGroup.Item
            value="full-time"
            className={`px-3 py-2 cursor-pointer ${
              employmentType === "full-time" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Full-time
          </RadioGroup.Item>
          <RadioGroup.Item
            value="part-time"
            className={`px-3 py-2 cursor-pointer ${
              employmentType === "part-time" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Part-time
          </RadioGroup.Item>
          <RadioGroup.Item
            value="contractor"
            className={`px-3 py-2 cursor-pointer ${
              employmentType === "contractor" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Contractor
          </RadioGroup.Item>
          <RadioGroup.Item
            value="internship"
            className={`px-3 py-2 cursor-pointer ${
              employmentType === "internship" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Internship
          </RadioGroup.Item>
        </RadioGroup.Root>
      </Card>

      <Card className="p-4 space-y-3 shadow-md">
        <Text className="font-semibold text-gray-700 mb-2">Minimum Package (per annum)</Text>
        <Slider
          min={100000}
          max={2000000}
          value={[minSalary]}
          onValueChange={(val) => setMinSalary(val[0])}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>1L</span>
          <span>20L</span>
        </div>
        <Text className="text-gray-700 mt-1">Selected: ₹{minSalary.toLocaleString()}</Text>
      </Card>

      <Button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Apply Filters
      </Button>
    </div>
  );
}
