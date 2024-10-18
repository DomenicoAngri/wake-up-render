# Wake up Render!

This cronjob project is designed to keep a free Render service (or similar platforms) active by sending a request every 10 minutes. It’s ideal for preventing a free-tier app from going into sleep mode.

## Features

-   **Cronjob**: Sends a `GET` request to your specified `URL` (or to this cronjob itself if deployed on a platform to keep it awake) every `N` minutes (default is 10 minutes), ensuring the service stays active!

-   **Configurable**: Easily adjustable! You can specify the `URL` for your backend, the cronjob `URL` to keep this job awake, and set different time intervals in **milliseconds**.

-   **Easy to use**: Simply set your `.env` file with three environment variables and run the script!

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/DomenicoAngri/wake-up-render.git
    ```

2. **Install dependencies**:

    ```bash
     cd wake-up-render
     yarn install
    ```

3. **Configure Environment Variables**: Create a `.env` file in the root directory and add the endpoint `URL` you want to keep awake. You can also specify the interval in milliseconds for the requests. If not provided, the default will be set to 10 minutes.

    The name of the variables must to be:

    ```bash
    MY_SELF_URL=<THE_URL_FOR_THIS_CRONJOB>
    BACKEND_URL=<YOUR_BACKEND_URL>
    MILLISECONDS=<MILLISECONDS>
    ```

## Usage

Run the script with:

```js
node main.js
```

The script will send GET requests to the URL every N or 10 (default) minutes.

## Dependencies

-   `https` for HTTP requests.
-   `dotenv` for managing environment variables.

## License

This project is licensed under the GPL-3.0 License.
