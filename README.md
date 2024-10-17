# Wake up Render!

This cronjob project is designed to keep a free Render service awake by making a request every 10 minutes. Ideal for preventing a free-tier app from going to sleep.

## Features

-   **Cronjob**: Sends a GET request every 10 minutes to keep a service active.

-   **Configurable**: Easily adjustable! You can choose the cronjob URL for to keep awake this job, the URL for your backend, and different time intervals!

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

3. **Configure Environment Variables**: Create a .env file in the root directory and add the endpoint URL you want to keep awake. Additionally you can also choose the milliseconds to call the functions, if you don't choose milliseconds, default will be 10 minutes.

    The name of the variables must to be:

    ```bash
    MY_SELF_URL=<THE_URL_FOR_THIS_CRONJOB>

    BACKEND_URL=<YOUR_BACKEND_URL>

    MILLISECONDS=<MILLISECONDS> // EG: 600000 for 10 minutes.
    ```

## Usage

Run the script with:

    ```bash
    node main.js
    ```

The script will send GET requests to the URL every N or 10 (default) minutes.

## Dependencies

-   node-fetch for HTTP requests.
-   dotenv for managing environment variables.

## License

This project is licensed under the GPL-3.0 License.
