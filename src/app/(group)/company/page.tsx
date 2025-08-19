import DeleteCompanyButton from '@/app/components/delete-company-btn'
import prismaClient from '@/services/prisma'
import React from 'react'

export default async function Page() {

    const companies = await prismaClient.company.findMany({
        include: {
            owner: true
        }
    })
    return (
        <div>
            {
                companies.map((comp) => {
                    return (
                        <div key={comp.id}>
                            <h1>{comp.name}</h1>
                            <p>{comp.description}</p>
                            <br />
                            <br />
                            <br />
                            <br />
                            <p>{comp.owner.email}</p>

                            <div>
                                <DeleteCompanyButton id={comp.id} />

                                {comp.jobs?.map((job) => (
                                    <div key={job.id}>
                                        <h2>{job.title}</h2>
                                        <p>{job.description}</p>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}
