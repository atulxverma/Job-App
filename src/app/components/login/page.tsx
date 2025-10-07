"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, TextField, Button, Text, Flex } from "@radix-ui/themes";
import { UserContext } from "@/app/(group)/layout";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user)
        alert("Login successful");
        router.push("/"); 
        router.refresh();
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-[400px] p-6 bg-gray-900 text-white" variant="classic">
        <Text size="5" weight="bold" align="center" mb="4">
          Login
        </Text>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Text as="label" htmlFor="email" size="2">
              Email
            </Text>
            <TextField.Root
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Text as="label" htmlFor="password" size="2">
              Password
            </Text>
            <TextField.Root
              id="password"
              placeholder="Enter Password..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" color="blue">
            Login
          </Button>
        </form>

        <Flex direction="column" align="center" mt="4" gap="2">
          <Text size="2" color="gray">
            Don’t have an account?{" "}
            <Link href="/signup" color="blue">
              Register
            </Link>
          </Text>
          <Text size="1" color="gray" align="center">
            By logging in, you agree to our{" "}
            <Link href="/terms" color="blue">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" color="blue">
              Privacy Policy
            </Link>
          </Text>
        </Flex>
      </Card>
    </div>
  );
}

