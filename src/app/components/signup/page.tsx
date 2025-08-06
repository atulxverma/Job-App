import { FormEvent, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  async function handleSubmit(e : FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = {
      email,
      password: pass,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Signup successful:", data);
        // optionally clear form
        setEmail("");
        setPass("");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}







// 'use client';
// import { useState } from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import { FaApple } from 'react-icons/fa';
// import Footer from "../Footer";

// export default function SignupForm() {
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const user = { email, password: pass };

//     try {
//       const res = await fetch('/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         console.log('Signup successful:', data);
//         setEmail('');
//         setPass('');
//       } else {
//         console.error('Signup failed');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col justify-between">
//       {/* Navbar */}
//       <div className="flex justify-between items-center px-6 py-4 border-b">
//         <h1 className="text-green-700 text-2xl font-bold">'GLASSDOOR'</h1>
//         <button className="px-4 py-1 border border-black rounded-md">Sign in</button>
//       </div>

//       {/* Signup Section */}
//       <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
//         <h2 className="text-3xl font-bold mt-8 mb-2 text-green-700">Your work people are here</h2>
//         <p className="text-sm mb-6 text-gray-600">
//           By continuing, you agree to our <span className="text-blue-600 underline">Terms of Use</span> and <span className="text-blue-600 underline">Privacy Policy</span>.
//         </p>

//         <div className="flex flex-col gap-3 w-full max-w-sm text-left">
//           <button className="flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-md">
//             <FcGoogle className="text-xl bg-white rounded-full p-0.5" /> Continue with Google
//           </button>
//           <button className="flex items-center justify-center gap-2 py-2 border rounded-md">
//             <FaApple className="text-xl" /> Continue with Apple
//           </button>

//           <div className="relative text-gray-400 my-1">
//             <hr />
//             <span className="absolute top-[-10px] bg-white px-2 left-1/2 transform -translate-x-1/2 text-sm">or</span>
//           </div>

//           {/* ✅ Your working form */}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password..."
//               value={pass}
//               onChange={(e) => setPass(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Continue with email
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// }
