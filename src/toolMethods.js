/* ********************************************************
 * This class contain some util methods                   *
 * ********************************************************/

// Https library to perform https requests.
import https from "https";

// Import checkLibrariesLoad internal library.
import { checkLibrariesLoad } from "./errorMethods.js";

/**
 * calculateMilliseconds
 * Calculate milliseconds in minutes, hours or days.
 * @param milliseconds - int
 * @returns string
 */
export const calculateMilliseconds = (milliseconds) => {
    // Calculate seconds
    if (milliseconds < 60000) {
        const seconds = milliseconds / 1000;

        if (seconds < 1) {
            return `${seconds} seconds`;
        } else if (seconds === 1) {
            return "1 second";
        } else {
            return `${seconds} seconds`;
        }
    }
    // Calculate minutes.
    else if (milliseconds < 1000 * 60 * 60) {
        const minutes = milliseconds / 60000;

        if (minutes === 1) {
            return "1 minute";
        } else {
            return `${minutes} minutes`;
        }
    }
    // Calculate hours.
    else if (milliseconds < 1000 * 60 * 60 * 24) {
        const hours = milliseconds / (1000 * 60 * 60);

        if (hours === 1) {
            return "1 hour";
        } else {
            return `${hours} hours`;
        }
    }
    // Calculate days.
    else {
        const days = milliseconds / (1000 * 60 * 60 * 24);

        if (days === 1) {
            return "1 day";
        } else {
            return `${days} days`;
        }
    }
};

// This function is useful for to keep awake this cronjob.
export const keepAliveMySelf = (mySelfUrl) => {
    // Check if library was load correctly. If no, stop the script now, otherwise go ahead.
    if (!checkLibrariesLoad(https)) {
        return console.error(
            "[ERROR] - Https library was not loaded correctly! Please try load script again."
        );
    }

    console.log("Leaving my self awake...");

    // Https request to keep cronjob awake.
    https
        .get(mySelfUrl, (res) => {
            if (res.statusCode === 200) {
                console.log("I'm awake!");
            } else {
                console.error(
                    `[ERROR] - Failed to keep my self awake with status code: ${res.statusCode}, and message: ${res.statusMessage}.`
                );
            }
        })
        .on("error", (err) => {
            console.error("[ERROR] - Error during keeping my self awake: ", err.message);
        });
};

// This function is useful for to keep awake the backend server.
export const keepAliveBE = (backendUrl) => {
    // Check if library was load correctly. If no, stop the script now, otherwise go ahead.
    if (!checkLibrariesLoad(https)) {
        return console.error(
            "[ERROR] - Https library was not loaded correctly! Please try load script again."
        );
    }

    console.log("Leaving the server awake...");

    // Https request to keep server awake.
    https
        .get(backendUrl, (res) => {
            if (res.statusCode === 200) {
                console.log("The server continues to stay awake!");
            } else {
                console.error(
                    `[ERROR] - Failed to keep server awake with status code: ${res.statusCode}, and message: ${res.statusMessage}.`
                );
            }
        })
        .on("error", (err) => {
            console.error("[ERROR] - Error during keeping server awake: ", err);
        });
};
