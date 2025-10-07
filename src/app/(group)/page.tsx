// import data from "@/data";
// import Jobcard from "../components/cards/job-card";
// import prismaClient from "@/services/prisma";

// export default async function Home() {
//   // const jobs = data?.data;
//   const jobs = await prismaClient.openings.findMany({
//     include: {
//       company: {
//         include: {
//           owner: true
//         }
//       }
//     }

//   })

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <div className="flex flex-wrap justify-center gap-10 p-10">
//         {jobs.map((job) => (
//           <Jobcard key={job.id} job={job} />
//         ))}
//       </div>
//     </main>
//   );
// }






import prismaClient from "@/services/prisma";
import Jobcard from "../components/cards/job-card";
// import Header from "../components/header";
import Footer from "../components/Footer";

export default async function Home() {
  const jobs = await prismaClient.openings.findMany({
    include: {
      company: {
        include: {
          owner: true,
        },
      },
    },
  });

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Latest Job Openings:
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <Jobcard key={job.id} job={job} fromSearch={false} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

