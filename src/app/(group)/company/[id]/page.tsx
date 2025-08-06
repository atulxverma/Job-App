//@ts-nocheck
import CompanyReviewAndJobsContainer from "@/app/components/company-listing-reviews";
import DeleteCompanyButton from "@/app/components/delete-company-btn";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";

export default async function Page({ params }) {
    const id = params.id;

    const res = await fetch("http://localhost:3000/api/company/" + id);
    const data = await res.json();
    const company = data.data;

    const res2 = await fetch("http://localhost:3000/api/review/" + id);
    const data = await res.json();
    const reviews = await data?.data;
    // const owner = data.data.owner;

    return (
        <div className="gap-5">
            <Heading>{company.name}</Heading>
            <Card> 
                <p>{company.description}</p>
            </Card>
            <Flex className="justify-between">
                <Text>
                    By:
                    <Badge>
                        <p>{company.owner.email}</p>
                    </Badge>
                </Text>

                <DeleteCompanyButton id={company.id} />

            </Flex>
            <CompanyReviewAndJobsContainer reviews={reviews} company={company}/>
        </div>
    )
}