// import { FormEvent, useState } from "react";

// export default function SignupPage() {
//   const [email, setEmail] = useState<string>("");
//   const [pass, setPass] = useState<string>("");

//   async function handleSubmit(e : FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const user = {
//       email,
//       password: pass,
//     };

//     try {
//       const res = await fetch("/api/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         console.log("Signup successful:", data);
//         // optionally clear form
//         setEmail("");
//         setPass("");
//       } else {
//         console.error("Signup failed");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter email..."
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter password..."
//           value={pass}
//           onChange={(e) => setPass(e.target.value)}
//           className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }







'use client'
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import Footer from "../Footer";
import { Button, Text, Flex, Link } from '@radix-ui/themes';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = { email, password: pass };

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Signup successful:', data);
        setEmail('');
        setPass('');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-green-700 text-2xl font-bold">GLASSDOOR</h1>
        <Link href='/login'>
        <Button variant="outline" className="border-gray-300 px-4 py-1 rounded-md hover:bg-gray-100 transition">
          Sign in
        </Button>
        </Link>
      </div>

      {/* Signup Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <Text size="5" weight="bold" className="text-green-700 mt-8 mb-4">
          Your work people are here
        </Text>
        <Text size="2" className="text-gray-600 mb-6 max-w-xs">
          By continuing, you agree to our{' '}
          <Link href="#" color="blue" underline>
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="#" color="blue" underline>
            Privacy Policy
          </Link>.
        </Text>

        <div className="flex flex-col gap-3 w-full max-w-md text-left">
          {/* Social Buttons */}
          <Button className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition">
            <FcGoogle className="text-xl bg-white rounded-full p-0.5" /> Continue with Google
          </Button>
          <Button className="flex items-center justify-center gap-2 py-3 border rounded-md shadow hover:bg-gray-100 transition">
            <FaApple className="text-xl" /> Continue with Apple
          </Button>

          {/* Divider */}
          <div className="relative text-gray-400 my-4">
            <hr />
            <span className="absolute top-[-10px] bg-gray-50 px-2 left-1/2 transform -translate-x-1/2 text-sm">
              or
            </span>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />

            <input
              type="password"
              placeholder="Enter password..."
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />

            <Button type="submit" color="blue" className="w-full py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Continue with email
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

