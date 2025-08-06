// components/Footer.tsx
"use client";
import { Box, Grid, Text, Heading, Flex } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Box className="border-t bg-gray-50 py-10 px-4">
      <Grid
        columns={{ initial: "2", md: "4" }}
        gap="6"
        className="max-w-6xl mx-auto text-gray-700"
      >
        <Box>
          <Heading as="h3" size="3" className="text-green-700 mb-3">
            GLASSDOOR
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="2">About / Press</Text>
            <Text size="2">Blog</Text>
            <Text size="2">Contact Us</Text>
            <Text size="2">Grievance Officer - India</Text>
          </Flex>
        </Box>

        <Box>
          <Heading as="h3" size="3" className="mb-3">
            Employers
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="2">Get a FREE Employer Account</Text>
            <Text size="2">Employer Centre</Text>
          </Flex>
        </Box>

        <Box>
          <Heading as="h3" size="3" className="mb-3">
            Information
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="2">Help</Text>
            <Text size="2">Terms of Use</Text>
            <Text size="2">Privacy and Ad Choices</Text>
            <Text size="2">Cookie Consent Tool</Text>
          </Flex>
        </Box>

        <Box>
          <Heading as="h3" size="3" className="mb-3">
            Work With Us
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="2">Advertisers</Text>
            <Text size="2">Careers</Text>
          </Flex>
        </Box>
      </Grid>

      <Box mt="6" className="text-center text-gray-500">
        <Text size="1">© 2025 YourCompany</Text>
      </Box>
    </Box>
  );
}
