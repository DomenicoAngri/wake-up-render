/* ********************************************************
 * This class check all initial configuration and errors. *
 * ********************************************************/

/**
 * checkLibrariesLoad
 * Check if libraries is loaded correctly. If true the library was load correctly, otherwise return false.
 * @param library
 * @returns boolean
 */
export const checkLibrariesLoad = (library) => {
    if (library) {
        return true;
    } else {
        return false;
    }
};

/**
 * checkEmptyUrl
 * Check if url is empty, if empty return true, otherwise return false.
 * @param url - String
 * @returns boolean
 */
export const checkEmptyUrl = (url) => {
    if (url) {
        return false;
    } else {
        return true;
    }
};

/**
 * checkIfUrl
 * Check if string is an url.
 * @param url - String
 * @returns boolean
 */
export const checkIfUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

    if (regex.test(url)) {
        return true;
    } else {
        return false;
    }
};

/**
 * checkMillisecondsLimit
 * Check the limit of milliseconds for setInterval, if true milliseconds pass limit.
 * @param milliseconds - int
 * @returns boolean
 */
export const checkMillisecondsLimit = (milliseconds) => {
    // The limit for setInterval function (32 bit).
    const limit = 2147483647;

    if (milliseconds > limit) {
        return true;
    } else {
        return false;
    }
};
