import { connection } from "next/server";

export default {
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://threadcraft_ai_owner:BL8JqbPn7vOf@ep-still-morning-a1036b52.ap-southeast-1.aws.neon.tech/threadcraft_ai?sslmode=require",
    connectionString:
      "postgresql://threadcraft_ai_owner:BL8JqbPn7vOf@ep-still-morning-a1036b52.ap-southeast-1.aws.neon.tech/threadcraft_ai?sslmode=require",
  },
};
