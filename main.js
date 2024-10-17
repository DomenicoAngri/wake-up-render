// Required library to access to env variables.
require("dotenv").config();

// Https library to perform https requests.
const https = require("https");

// URL for the cronjob and for the backend.
const mySelfUrl = process.env.MY_SELF_URL;
const backendUrl = process.env.BACKEND_URL;

// This function is useful for to keep awake this cronjob.
const keepAliveMySelf = () => {
    console.log("Leaving my self awake...");

    // Https request to keep cronjob awake.
    https
        .get(mySelfUrl, (res) => {
            if (res.statusCode === 200) {
                console.log("I'm awake!");
            } else {
                console.error(
                    `Failed to keep my self awake with status code: ${res.statusCode}, and message: ${res.statusMessage}.`
                );
            }
        })
        .on("error", (err) => {
            console.error("Error during keeping my self awake: ", err.message);
        });
};

// This function is useful for to keep awake the backend server.
const keepAliveBE = () => {
    console.log("Leaving the server awake...");

    // Https request to keep server awake.
    https
        .get(backendUrl, (res) => {
            if (res.statusCode === 200) {
                console.log("The server continues to stay awake!");
            } else {
                console.error(
                    `Failed to keep server awake with status code: ${res.statusCode}, and message: ${res.statusMessage}.`
                );
            }
        })
        .on("error", (err) => {
            console.error("Error during keeping server awake: ", err);
        });
};

// Ping every 10 minutes cronjob & backend.
setInterval(keepAliveMySelf, 10 * 60 * 1000);
setInterval(keepAliveBE, 10 * 60 * 1000);
