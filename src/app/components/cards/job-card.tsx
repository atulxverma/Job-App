// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Card,
//   Flex,
//   Heading,
//   Text,
//   ThickChevronRightIcon,
// } from "@radix-ui/themes";
// import Link from "next/link";
// import React from "react";

// import { Openings, Company } from "../../../../generated/prisma";

// export type OpeningWithCompany = Openings & { company: Company };
// export default function Jobcard({ job , fromSearch = true } : 
//   {
//     job : OpeningWithCompany
//     fromSearch? : boolean
//   }
// ) {
//   return (
//     <Card className={fromSearch ? "max-w-100 h-[320] flex flex-col m-5" : "max-w-1/4 h-[320] flex flex-col m-5 gap-10"}>
//       <Flex className="items-start justify-between mb-10">
//         <Heading className="text-lg truncate">{job.title}</Heading>
//         <Badge color="blue">{job.employment_type}</Badge>
//       </Flex>
//       <div className="flex-1">
//       <p className="line-clamp-5">{job.description}</p>
//       </div>
//       <Badge className="caret-blue-600 m-[10px] min-w-min">{job.location}</Badge>
//       <Flex>
//         {/* <Box maxWidth="240px">
//           <Card>
//             <Flex gap="3" align="center">
//               {job.employer_logo && (
//                 <Avatar
//                   size="3"
//                   src={job.employer_logo}
//                   radius="full"
//                   fallback="T"
//                 />
//               )}
//               <Box>
//                 <Text as="div" size="2" weight="bold">
//                   {job.employer_name}
//                 </Text>
//                 <Text as="div" size="2" color="gray">
//                   Engineering
//                 </Text>
//               </Box>
//             </Flex>
//           </Card>
//         </Box> */}
//         <Link href={`/job/${job.id}`}>
//         <Button className="flex justify-center items-center">
//           <Text>View Job Details</Text>
//           <ThickChevronRightIcon />
//         </Button>
//         </Link>
//         <Link href={"/company" + job.company.id}>
//         <h2>{job?.company?.name}</h2>
//         {/* <h2>{job?.company?.owner?.null}</h2> */}
//         </Link>
//       </Flex>
//     </Card>
//   );
// }






import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { ThickChevronRightIcon } from "@radix-ui/themes";
import Link from "next/link";
import { Openings, Company } from "../../../../generated/prisma";

export type OpeningWithCompany = Openings & { company: Company };

export default function Jobcard({
  job,
  fromSearch = false,
}: {
  job: OpeningWithCompany;
  fromSearch?: boolean;
}) {
  return (
    <Card className="p-5 shadow-md hover:shadow-xl transition-all duration-200 bg-white">
      <Flex justify="between" align="center" className="mb-3">
        <Heading size="4" className="truncate text-gray-800">
          {job.title}
        </Heading>
        <Badge color="blue" size="2">
          {job.employment_type}
        </Badge>
      </Flex>

      <Text size="2" className="line-clamp-4 text-gray-600 mb-4">
        {job.description}
      </Text>

      <Badge color="green" size="1" className="mb-3">
        {job.location}
      </Badge>

      <Flex gap="3" align="center" justify="between" mt="4">
        <Link href={`/job/${job.id}`}>
          <Button size="2">
            <Text>View Details</Text>
            <ThickChevronRightIcon />
          </Button>
        </Link>

        {
          job?.company && <Link href={`/company/${job.company.id}`}>
            <Text size="2" weight="medium" color="gray">
              {job?.company?.name}
            </Text>
          </Link>
        }
      </Flex>
    </Card>
  );
}
