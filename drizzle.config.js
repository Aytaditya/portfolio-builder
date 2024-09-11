/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://createdb_owner:EXLWGQ8Cxuh2@ep-summer-darkness-a5a60l79.us-east-2.aws.neon.tech/createdb?sslmode=require',
    }
  };