import EditDeleteCompany from "@/app/components/edit-delete-company";
import JobApplyButton from "@/app/components/job-apply-btn";
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
import { Book, BookmarkIcon, SendIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/job/${id}`);
  const data = await res.json();

  if (!data?.success) {
    notFound();
  }

  const job = data?.data;

  return (
    <main className="p-10">
      {/* Title and Action Buttons */}
      <Flex justify="between" align="center" className="mb-4">
        <Flex gap="4" align="center" className="mb-4">
          <Heading>{job.job_title}</Heading>
          <Badge color="blue">{job.job_location}</Badge>
          <Badge color="blue">{job.job_employment_types[0]}</Badge>
        </Flex>

        <Flex>

        </Flex>
        <Button>
          <BookmarkIcon/>
          Save
        </Button>
        <JobApplyButton />

        <Flex gap="4">
          <Button size="3" variant="outline">
            <BookmarkIcon size={16} />
            Save
          </Button>
          <Button size="3" variant="solid">
            <SendIcon size={16} />
            Apply
          </Button>
        </Flex>
      </Flex>

      {/* Job Description */}
      <Box maxWidth="240px" className="mb-4"></Box>
      <Flex direction="column" gap="4">
        <div>
          <Text weight="bold">Job Description:</Text>
          <Card>
            <Text>{job.job_description.slice(0, 1000)}</Text>
          </Card>
        </div>

        {/* Responsibilities
        <div>
          <Text weight="bold">Responsibilities:</Text>
          <Card className="pl-4 list-disc">
            <ul>
              <Flex direction="column" gap="2">
                {job.job_highlights.Responsibilities?.map(
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

        {/* Qualifications */}
        {/* <div>
          <Text weight="bold">Qualifications:</Text>
          <Card className="pl-4 list-disc">
            <ul>
              <Flex direction="column" gap="2">
                {job.job_highlights.Qualifications?.map(
                  (qualification: string, index: number) => (
                    <li key={index}>
                      <Text>{qualification}</Text>
                    </li>
                  )
                )}
              </Flex>
            </ul>
          </Card>
        </div>  */}
        <Separator size={"4"} my={"5"} />
        <EditDeleteCompany job={job} />
      </Flex>
    </main>
  );
}
