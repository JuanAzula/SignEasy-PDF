import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaClient as MongoClient, Prisma } from "../../prisma/generated/mongo_client/index.js";
import { PrismaClient as PostgresClient } from "../../prisma/generated/postgres_client/index.js";

import pkg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'





// Prisma config
const { Pool } = pkg

export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo"

type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>
type ClientPostgres = PostgresClient<Prisma.PrismaClientOptions, never, DefaultArgs>

const mongoConnectionString = process.env.NODE_ENV === "test" ? `${process.env.MONGOTEST_URL}` : `${process.env.MONGO_URL}`


export let prismaClient: any
if (DATA_SOURCE === "postgres") {
    const connectionString = `${process.env.POSTGRES_URL}`
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const postgresClient: ClientPostgres = new PostgresClient({ adapter });
    console.log('postgresClient')
    prismaClient = postgresClient
} else {
    const mongoClient: ClientMongo = new MongoClient({ datasources: { db: { url: mongoConnectionString } } });
    console.log('mongoClient')
    prismaClient = mongoClient
}