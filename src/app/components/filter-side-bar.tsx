//@ts-nocheck
"use client";
import {Button, Card, RadioGroup, Slider, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function FilterSideBar() {
  const searchParams = useSearchParams();
  const jt = searchParams.get("jt");
  const et = searchParams.get("et");
  const q = searchParams.get("q");
  const ms = searchParams.get("ms");

  const router = useRouter();

  const [jobType, setJobType] = useState(jt || 'remote');
  // const [jobType, setJobType] = useState('remote');

  const [employmentType, setEmploymentType] = useState(et || "full-time");
  // const [employmentType, setEmploymentType] = useState("fulltime");

  const [minSalary, setMinSalary] = useState(ms || 0);

  function handleSubmit(){
    const url = `/search?q=${q}&jt=${jobType}&et=${employmentType}&ms=${minSalary}`;
    // const url = `/search?q=${q}&ms=${minSalary}`;
    
    router.push(url)
  }

  // function handleTypeChange(e) {
  //   console.log(e);
  // }
  return (
    <div className="flex items-start">
      <div className="">
        <Card>
          <Text className="font-sb">Jobs type:</Text>

          <RadioGroup.Root
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            name="job"
          >
            <RadioGroup.Item value="remote" onClick={() => setJobType("remote")}>
              Remote
            </RadioGroup.Item>
            <RadioGroup.Item value="on-site" onClick={() => setJobType("on-site")}>
              On-site
            </RadioGroup.Item>
            <RadioGroup.Item value="hybrid" onClick={() => setJobType("hybrid")}>
              Hybrid
            </RadioGroup.Item>
          </RadioGroup.Root>
        </Card>
        <Card>
          <Text>Employees type:</Text>

          <RadioGroup.Root
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            name="employee"
          >
            <RadioGroup.Item
              value="full-time"
              onClick={() => setEmploymentType("full-time")}
            >
              Full-time
            </RadioGroup.Item>
            <RadioGroup.Item
              value="part-time"
              onClick={() => setEmploymentType("part-time")}
            >
              Part-time
            </RadioGroup.Item>
            <RadioGroup.Item
              value="contractor"
              onClick={() => setEmploymentType("contractor")}
            >
              Contractor
            </RadioGroup.Item>
          </RadioGroup.Root>
        </Card>
        <Card>
          <Text className="font semibold">Min Package(per annum)</Text>
          <Slider minStepsBetweenThumbs={100000} min={100000} max={2000000} onValueCommit={x=>console.log(x)} className="mt-5" defaultValue={[1]}/>
            <div className="flex justify-between">
              <span>1L</span>
              <span>20L</span>
            </div>
        </Card>
        <Button onClick={handleSubmit}>Add Filters</Button>
      </div>
    </div>
  );
}
