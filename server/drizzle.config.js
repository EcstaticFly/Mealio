import { ENV } from "./configs/env.js";

export default {
  schema: "./db/schema.js",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: ENV.DATABASE_URL },
};
