import cron from "cron";
import https from "https";
import { ENV } from "./env.js";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(ENV.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.log("Error while sending request", e));
});

export default job;
