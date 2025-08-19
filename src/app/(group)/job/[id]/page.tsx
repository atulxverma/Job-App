// import ApplyDeleteButton from "@/app/components/apply-delete-btn";
// import EditDeleteCompany from "@/app/components/edit-delete-company";
// import JobApplyButton from "@/app/components/job-apply-btn";
// import { getUserFromCookies } from "@/lib/helper";
// import prismaClient from "@/services/prisma";
// import {
//   Badge,
//   Button,
//   Card,
//   Flex,
//   Heading,
//   Text,
//   Box,
//   Separator,
// } from "@radix-ui/themes";
// import { Book, BookmarkIcon, SendIcon } from "lucide-react";
// import { notFound } from "next/navigation";

// export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const user = await getUserFromCookies();

//   const res = await fetch("http://localhost:3000/api/job/" + id);
//   const data = await res.json();

//   if (!data?.success) {
//     notFound();
//   }

//   let userHasApplied = false;

//   if (user) {
//     const application = await prismaClient.applications.findMany({
//       where: {
//         job_id: id,
//         user_id: user.id
//       }
//     })
//     console.log(application)
//     if (application.length > 0) userHasApplied = true;
//   }




//   const job = data?.data;

//   return (
//     <main className="p-10">

//       <Flex justify="between" align="center" className="mb-4">
//         <Flex gap="4" align="center" className="mb-4">
//           <Heading>{job.job_title}</Heading>
//           <Badge color="blue">{job.job_location}</Badge>
//           <Badge color="blue">{job.job_employment_types[0]}</Badge>
//         </Flex>

//         <Flex>

//         </Flex>
//         <Button>
//           <BookmarkIcon />
//           Save
//         </Button>
//         <ApplyDeleteButton job={job} hasApplied={userHasApplied}/>


//         <Flex gap="4">
//           <Button size="3" variant="outline">
//             <BookmarkIcon size={16} />
//             Save
//           </Button>
//           <Button size="3" variant="solid">
//             <SendIcon size={16} />
//             Apply
//           </Button>
//         </Flex>
//       </Flex>


//       <Box maxWidth="240px" className="mb-4"></Box>
//       <Flex direction="column" gap="4">
//         <div>
//           <Text weight="bold">Job Description:</Text>
//           <Card>
//             <Text>{job.job_description.slice(0, 1000)}</Text>
//           </Card>
//         </div>

//         {/* Responsibilities
//         <div>
//           <Text weight="bold">Responsibilities:</Text>
//           <Card className="pl-4 list-disc">
//             <ul>
//               <Flex direction="column" gap="2">
//                 {job.job_highlights.Responsibilities?.map(
//                   (responsibility: string, index: number) => (
//                     <li key={index}>
//                       <Text>{responsibility}</Text>
//                     </li>
//                   )
//                 )}
//               </Flex>
//             </ul>
//           </Card>
//         </div>

//         {/* Qualifications */}
//         {/* <div>
//           <Text weight="bold">Qualifications:</Text>
//           <Card className="pl-4 list-disc">
//             <ul>
//               <Flex direction="column" gap="2">
//                 {job.job_highlights.Qualifications?.map(
//                   (qualification: string, index: number) => (
//                     <li key={index}>
//                       <Text>{qualification}</Text>
//                     </li>
//                   )
//                 )}
//               </Flex>
//             </ul>
//           </Card>
//         </div>  */}
//         <Separator size={"4"} my={"5"} />
//         <EditDeleteCompany job={job} />
//       </Flex>
//     </main>
//   );
// }














import ApplyDeleteButton from "@/app/components/apply-delete-btn";
import EditDeleteCompany from "@/app/components/edit-delete-company";
import EditJobBtn from "@/app/components/edit-job-btn";
import { getUserFromCookies } from "@/lib/helper";
import prismaClient from "@/services/prisma";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  Box,
  Separator,
} from "@radix-ui/themes";
import { BookmarkIcon, SendIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserFromCookies();

  const res = await fetch("http://localhost:3000/api/job/" + id);
  const data = await res.json();

  if (!data?.success) {
    notFound();
  }

  let userHasApplied = false;

  if (user) {
    const application = await prismaClient.applications.findMany({
      where: {
        job_id: id,
        user_id: user.id,
      },
    });
    if (application.length > 0) userHasApplied = true;
  }

  const job = data?.data;

  return (
    <main className="p-10">
      <Flex justify="between" align="center" className="mb-4">
        <Flex gap="4" align="center" className="mb-4">
          <Heading>{job?.job_title || "Untitled Job"}</Heading>
          {job?.job_location && <Badge color="blue">{job.job_location}</Badge>}
          {job?.job_employment_types?.[0] && (
            <Badge color="blue">{job.job_employment_types[0]}</Badge>
          )}
        </Flex>

        

        <Flex gap="4">
          <Button size="3" variant="outline">
            <BookmarkIcon size={16} />
            Save
          </Button>
          
            <ApplyDeleteButton job={job} hasApplied={userHasApplied} />

        </Flex>
      </Flex>

      <Box maxWidth="240px" className="mb-4"></Box>
      <Flex direction="column" gap="4">
        <div>
          <Text weight="bold">Job Description:</Text>
          <Card>
            <Text>{job?.job_description?.slice(0, 1000) || "No description available."}</Text>
          </Card>
        </div>

        {/* {job?.job_highlights?.Responsibilities && (
          <div>
            <Text weight="bold">Responsibilities:</Text>
            <Card className="pl-4 list-disc">
              <ul>
                <Flex direction="column" gap="2">
                  {job.job_highlights.Responsibilities.map(
                    (responsibility: string, index: number) => (
                      <li key={index}>
                        <Text>{responsibility}</Text>
                      </li>
                    )
                  )}
                </Flex>
              </ul>
            </Card>
          </div>
        )} */}

        {/* {job?.job_highlights?.Qualifications && (
          <div>
            <Text weight="bold">Qualifications:</Text>
            <Card className="pl-4 list-disc">
              <ul>
                <Flex direction="column" gap="2">
                  {job.job_highlights.Qualifications.map(
                    (qualification: string, index: number) => (
                      <li key={index}>
                        <Text>{qualification}</Text>
                      </li>
                    )
                  )}
                </Flex>
              </ul>
            </Card>
          </div>
        )} */}

        <Separator size={"4"} my={"5"} />
        <EditDeleteCompany job={job} />
      </Flex>
    </main>
  );
}
