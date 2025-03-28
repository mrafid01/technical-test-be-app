# Technical Test Backend Application

This is the backend application for the technical test, built using Node.js, Prisma, and MySQL. It manages users and their tasks.

## Technologies Used

*   **Node.js:**  The runtime environment for the backend application.
*   **Prisma:** An ORM (Object-Relational Mapper) for database access.
*   **MySQL:** The relational database used for data storage.
* **Prisma Client JS:** The generated client to interact with the database.

## Database Schema

The database schema is defined in `prisma/schema.prisma`. It consists of two main models:

### User

*   **id (String):** Unique identifier for the user (Primary Key).
*   **email (String):** User's email address (Unique).
*   **name (String, Optional):** User's name.
*   **image (String, Optional):** URL to the user's profile image.
*   **tasks (Task[]):** A list of tasks associated with the user.

### Task

*   **id (Int):** Unique identifier for the task (Primary Key, Auto-increment).
*   **title (String):** Title of the task.
*   **description (String, Optional):** Description of the task.
*   **dueDate (DateTime):** Due date for the task.
*   **completed (Boolean):** Indicates whether the task is completed (default: `false`).
*   **userId (String):** Foreign key referencing the `User` model.
*   **user (User):** The user associated with the task.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   **Node.js (v16 or higher):** https://nodejs.org/
*   **MySQL:** A running MySQL server.
*   **NPM or Yarn:** Package manager for Node.js.
* **Prisma CLI:** `npm install -g prisma`

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mrafid01/technical-test-be-app.git
    cd technical-test-be-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Set up the database:**

    *   Create a `.env` file in the root directory of the project.
    *   Add the `DATABASE_URL` environment variable to the `.env` file, pointing to your MySQL database. For example:

        ```
        DATABASE_URL="mysql://user:password@host:port/database"
        ```

        *   Replace `user`, `password`, `host`, `port`, and `database` with your actual MySQL credentials.

4.  **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev --name init
    ```
    This command will create the tables in your database based on the `schema.prisma` file.

5. **Generate Prisma Client**
    ```bash
    npx prisma generate
    ```
    This command will generate the prisma client that will be used to interact with the database.

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev # or yarn dev
    ```

## API Endpoints (Example)

*(You will need to define these in your application code)*

*   **POST /users:** Create a new user.
*   **POST /tasks:** Create a new task.
*   **GET /tasks:** Get all tasks.
*   **PUT /tasks/:id:** Update a task.
*   **DELETE /tasks/:id:** Delete a task.

## Contact

Muhammad Rafid - rafid.muhammad12@gmail.com
