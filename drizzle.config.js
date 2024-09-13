

/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://createdb_owner:EXLWGQ8Cxuh2@ep-summer-darkness-a5a60l79.us-east-2.aws.neon.tech/createdb?sslmode=require',
  },
};
