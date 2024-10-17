const cron = require("cron");
const https = require("https");
const backendUrl = "https://backend-wc7s.onrender.com";

const job = new cron.CronJob("*/14 * * * *", () => {
    // This function will be excecute every 14 minutes.
    console.log("Leaving the server awake...");

    // Https request to keep server awake.
    https
        .get(backendUrl, (res) => {
            if (res === 200) {
                console.log("The server continues to stay awake!");
            } else {
                console.error(`Failed to keep server awake with status code: ${res.statusCode}`);
            }
        })
        .on("error", (err) => {
            console.error("Error during keeping server awake: ", err.message);
        });
});

module.exports = {
    job,
};
