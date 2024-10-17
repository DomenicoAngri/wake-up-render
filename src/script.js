/* ************************************************
 * IMPORT SECTION                                 *
 * ************************************************/

// Required library to access to env variables.
import dotenv from "dotenv";

// Import internal libraries.
import {
    checkLibrariesLoad,
    checkEmptyUrl,
    checkIfUrl,
    checkMillisecondsLimit,
} from "./errorMethods.js";
import { calculateMilliseconds, keepAliveMySelf, keepAliveBE } from "./toolMethods.js";

const startScript = () => {
    // Check if library was load correctly. If no, stop the script now, otherwise go ahead.
    if (!checkLibrariesLoad(dotenv)) {
        console.error(
            "[ERROR] - Https library was not loaded correctly! Please try load script again."
        );
        process.exit(-1);
    }

    // Launch dotenv config method.
    dotenv.config();

    /* ************************************************
     * DEFINE SECTION                                 *
     * ************************************************/

    // URL for the cronjob and for the backend.
    const mySelfUrl = process.env.MY_SELF_URL;
    const backendUrl = process.env.BACKEND_URL;

    // If milliseconds are defined, will use them, otherwise default is 10 minutes.
    const milliseconds = process.env.MILLISECONDS ? process.env.MILLISECONDS : 600000;

    // Variable for to check if cronjob will have to call himself.
    let haveIcallMySelf = false;

    /* ************************************************
     * CHECK ERROR SECTION                            *
     * ************************************************/

    // Start the script
    console.log("Welcome to Wake up render! by dangrix10.");

    // Check if cronjob url is empty and valid.
    // If is empty print an info message and go ahead (setInterval for cronjob will not start).
    // If no, check if is a valid url.
    // If yes go ahead and set variable true and setInterval for cronjob will called, if no print an error message and exit.
    if (checkEmptyUrl(mySelfUrl)) {
        console.info(
            "[INFO] - You haven't set a URL for this cron job, so I can't keep myself awake. See the documentation for more information."
        );
    } else if (!checkIfUrl(mySelfUrl)) {
        console.error(
            "[ERROR] - The string you entered is not a valid URL! See the documentation for more information."
        );

        process.exit(-1);
    } else {
        haveIcallMySelf = true;
    }

    // Check if backend url is empty and valid. If will be an error, stop the script now, otherwise go ahead.
    if (checkEmptyUrl(backendUrl) || !checkIfUrl(backendUrl)) {
        console.error(
            "[ERROR] - You have almost define the backend URL! Create an .env file and add this variable: 'BACKEND_URL'. See docs for more information."
        );

        process.exit(-1);
    }

    // Check if milliseconds pass the limit.
    if (milliseconds || milliseconds <= 0) {
        console.error("[ERROR] - The milliseconds number must be positive!");
        process.exit(-1);
    } else if (checkMillisecondsLimit(milliseconds)) {
        console.error(
            "[ERROR] - The number you've entered for milliseconds is too large. The maximum allowed is 2147483647 (32 BIT)."
        );

        process.exit(-1);
    }

    /* ************************************************
     * BODY SCRIPT SECTION                            *
     * ************************************************/

    // Welcome message.
    const time = calculateMilliseconds(milliseconds);
    console.log(`You will keep alive the server every ${time}.`);

    // Check if a cronjob url is available. If yes ping cronjob every n minutes, if no, print an info message.
    if (haveIcallMySelf) {
        setInterval(() => {
            keepAliveMySelf(mySelfUrl);
        }, milliseconds);
    }

    // Ping every n minutes the backend.
    setInterval(() => {
        keepAliveBE(backendUrl);
    }, milliseconds);
};

export default startScript;
