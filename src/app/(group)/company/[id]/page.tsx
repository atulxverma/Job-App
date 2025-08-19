// //@ts-nocheck
// import CompanyReviewAndJobsContainer from "@/app/components/company-listing-reviews";
// import DeleteCompanyButton from "@/app/components/delete-company-btn";
// import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";

// export default async function Page({ params }) {
//     const id = params.id;

//     const res = await fetch("http://localhost:3000/api/company/" + id);
//     const data = await res.json();
//     const company = data.data;

//     const res2 = await fetch("http://localhost:3000/api/review/" + id);
//     const data2 = await res2.json();
//     const reviews = await data2?.data;
//     // const owner = data.data.owner;

//     return (
//         <div className="gap-5">
//             <Heading>{company.name}</Heading>
//             <Card> 
//                 <p>{company.description}</p>
//             </Card>
//             <Flex className="justify-between">
//                 <Text>
//                     By:
//                     <Badge>
//                         <p>{company.owner.email}</p>
//                     </Badge>
//                 </Text>

//                 <DeleteCompanyButton id={company.id} />

//             </Flex>
//             <CompanyReviewAndJobsContainer reviews={reviews} company={company}/>
//         </div>
//     )
// }







// @ts-nocheck

import CompanyReviewAndJobsContainer from "@/app/components/company-listing-reviews";
import DeleteCompanyButton from "@/app/components/delete-company-btn";
import EditDeleteCompany from "@/app/components/edit-delete-company";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";

export default async function Page({ params }) {
  const id = params.id;


  const res = await fetch(`http://localhost:3000/api/company/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Failed to fetch company: ${res.status}`);
    return <div>Company not found or server error</div>;
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error("Invalid JSON from /api/company/:id", err);
    return <div>Invalid response from server</div>;
  }

  const company = data?.data;
  if (!company) {
    return <div>Company not found</div>;
  }

  const res2 = await fetch(`http://localhost:3000/api/review/${id}`, {
    cache: "no-store",
  });

  let reviews = [];
  if (res2.ok) {
    try {
      const data2 = await res2.json();
      reviews = data2?.data || [];
    } catch (err) {
      console.error("Invalid JSON from /api/review/:id", err);
    }
  }

  return (
    <div className="gap-5">
      <Heading>{company.name}</Heading>
      <Card>
        <p>{company.description}</p>
      </Card>
      <Flex className="justify-between">
        <Text>
          By :-
          <Badge>
            <p>{company.owner?.email || "Unknown"}</p>
          </Badge>
        </Text>

        <DeleteCompanyButton id={company.id} />
        <EditDeleteCompany/>
      </Flex>
      <CompanyReviewAndJobsContainer reviews={reviews} company={company} />
    </div>
  );
}
