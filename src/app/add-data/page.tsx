import data from "@/data";
import prismaClient from "@/services/prisma";

export async function addData() {
  "use server";

  const newData = data.data.map((elem) => ({
    title: elem.job_title,
    description: elem.job_description,
    salary: 20000,
    location: elem.job_location,
    employment_name : elem.employer_name,
    job_type : elem.job_employment_type
  }))

  await prismaClient.openings.createMany({
    data: newData,
  });

  console.log("Jobs inserted");
}

export default function AddDataPage() {
  return (
    <form action={addData}>
      <button type="submit">Add Jobs</button>
    </form>
  );
}
