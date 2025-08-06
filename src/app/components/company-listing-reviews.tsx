//@ts-nocheck
'use client'
import { Badge, Box, Button, Card, Tabs, Text, TextArea } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { UserContext } from "../(group)/layout";
import { Company, Review } from "../../../generated/prisma";

export default function CompanyReviewAndJobsContainer({ company, reviews } : {
    company : Company,
    reviews : Review[]
}) {

    const [review , setReview] = useState<String>("");
    const [reviewList , setReviewList] = useState<Review[]>(reviews)
    const {user} = useContext(UserContext)

    async function handleCreateReview(){
        const reviewToSave ={
            content : review,
            company_id : company.id
        }
        const finalReview = {
            ...reviewToSave,
            user
        }
        const res = await fetch("/api/review" , {
            method : "POST",
            body : JSON.stringify(reviewToSave)
        })

        const data = await res.json();

        if(data.success){
            alert("Review Created")
            setReviewList(finalReview, ...reviewList)
        } else {
            alert("Failed to add")
        }
    }
    return (
        <Tabs.Root defaultValue="listed-jobs" className="mt-10">
            <Tabs.List>
                <Tabs.Trigger value="listed-jobs">Listed Jobs</Tabs.Trigger>
                <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
                <Tabs.Content value="listed-jobs">
                    <Text size="2">Latest Listed Jobs</Text>

                    <div className="flex flex-col gap-10 mt-5">
                        {
                            company.jobs.map((job) => {
                                return (
                                    <div key={job.id}>
                                        <h2>{job.title}</h2>
                                        <p>{job.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Tabs.Content>

                <Tabs.Content value="reviews">
                    <div>
                        <TextArea className="mb-4" placeholder="Add a Review..." value={review} onChange={e=>setReview(e.target.value)}/>
                        <Button onClick={handleCreateReview}>Add Review</Button>
                    </div>
                    <div className="mt-10">
                        <Text size="2">Top Reviews</Text>
                        <div className=" flex flex-col gap-5">
                            {
                                reviews.map((review)=>{
                                    return <Card key={review.id}>
                                        <Badge>{review.user.email}</Badge>
                                        <p>{review.content}</p>
                                    </Card>
                                })
                            }
                        </div>
                    </div>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );

}