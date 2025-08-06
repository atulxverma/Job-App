import { Company, Openings } from "../../generated/prisma";

export type JobWithCompany = {job : Openings & {company : Company}}