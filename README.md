# Todo-List-API

**The project assignment for roadmap.sh**

URL of the assignment in roadmap.sh:  
https://roadmap.sh/projects/todo-list-api

This API handles todo items in a Postgres database with user authentication and
authorization.  
Each todo item has a title and description.  
Authorization is handled with [JWT](https://www.jwt.io/).  
The API also has rate limiting to prevent abuse.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ilia-abbasi/Todo-List-API.git
   cd Todo-List-API
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create the `.env` file inside the `/misc` directory and set the variables:

   ```env
   PORT=your_port
   DB_USER=your_database_username
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   DB_PASSWORD=your_database_password
   DB_PORT=your_database_port
   JWT_SECRET=your_jwt_secret
   ```

4. Create the required tables in your database:

   ```sh
   npm run setup
   ```

## Usage

1. Run the server with:

   ```sh
   npm run start
   ```

2. Send requests using [Postman](https://www.postman.com/).

## Dependencies

- bcryptjs
- dotenv
- express
- express-rate-limit
- express-validator
- jsonwebtoken
- lodash
- morgan
- pg

The source code is formatted with [Prettier](https://prettier.io/).

---

Read the docs
[here](https://github.com/ilia-abbasi/Todo-List-API/blob/main/misc/Documentation.md).  
Todo-List-API is licensed under the
[GPL-3.0 license](https://github.com/ilia-abbasi/Todo-List-API/blob/main/LICENSE).
