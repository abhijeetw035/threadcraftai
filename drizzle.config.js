import { connection } from "next/server";

export default {
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: `${process.env.DATABASE_URI}`,
    connectionString:
      `${process.env.DATABASE_URI}`,
  },
};
