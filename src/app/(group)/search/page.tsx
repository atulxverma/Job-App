
import Jobcard, { OpeningWithCompany } from "@/app/components/cards/job-card";
import prismaClient from "@/services/prisma";
import { Openings } from "../../../../generated/prisma";

type searchPageQuery = Promise<{
    q : string,
    ms: string,
    page : string
    et : string
    jt : string
  }>

export default async function Page({ searchParams } : {searchParams : searchPageQuery}) {
  const queries = await searchParams
  const q = queries.q;
  const jt = queries.jt || "remote";
  const et = queries.et || "full-time";

  const ms = queries.ms ? Number.parseInt(queries.ms) : 0;
  const page = queries.page || 1;

  

  // const jobs = await prismaClient.openings.findMany({
  //   where: {
  //     title: {
  //       contains: q,
  //       mode: "insensitive",
  //     },
  //     job_type: jt,
  //     employment_type: et,
  //     salary: {
  //       gte: ms,
  //     },
  //   },
  // });

  const res = await fetch(`http://localhost:3000/api/search?q=${q}&ms=${ms}&page=${page}`);

  // if (!res.ok) {
  //   const text = await res.text();
  //   console.error("API failed:", res.status, text);
  //   return <div>Error loading data</div>;
  // }

  const data = await res.json();
  const jobs = data.data;

  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-center text-xl font-semibold pt-6">
        Showing results for: <span className="text-blue-600">{q}</span>
      </h1>

      <div className="flex flex-wrap justify-center gap-10 p-10">
        {jobs.length > 0 ? (
          jobs.map((job : OpeningWithCompany) => (
            <Jobcard fromSearch={true} key={job.id } job={job} />
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found for "{q}"</p>
        )}
      </div>
    </main>
  );
}
