# Flight Booking API

A backend application for managing flights, passengers, seats, and flight bookings, built with NestJS and GraphQL.

## Overview

Flight Booking API is a backend project designed to manage flight information and booking operations. It provides a GraphQL API for querying and managing application data.

## Features

- Manage flights and flight information.
- Manage passenger records.
- Create and manage flight bookings.
- Manage seat information and seat assignments.
- JWT-based authentication and authorization.
- Role-based access control, if implemented.
- GraphQL queries and mutations.
- DataLoader for optimizing related-data fetching and reducing unnecessary database queries.

## Tech Stack

- **Node.js** — JavaScript runtime.
- **NestJS** — Backend application framework.
- **TypeScript** — Type-safe development.
- **GraphQL** — API query language.
- **PostgreSQL** — Relational database.
- **TypeORM** — Object-relational mapping.
- **JWT** — Authentication.
- **DataLoader** — Batching and caching data loading.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamedelmrsawy/Airport.git  
   ```

2. Navigate to the project directory:

   ```bash
   cd flight-booking-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure your environment variables.

   Example:

   ```env
   PORT=3000

   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=flight_booking

   JWT_SECRET=your_secret_key
   ```

   Update the variable names to match those used in your application. Never commit real credentials or secrets.

## Running the Project

Start the application in development mode:

```bash
npm run start:dev
```

Build the application:

```bash
npm run build
```

Run the production build:

```bash
npm run start:prod
```

## GraphQL API

Once the application is running, open the GraphQL endpoint configured in your application.

For example:

```text
http://localhost:3000/graphql
```

You can use the GraphQL IDE, if enabled, to explore the schema and execute queries and mutations.

## Project Structure

```text
src/
├── app.module.ts
├── main.ts
├── flight/
├── passenger/
├── booking/
├── seat/
└── staff/
```

The folder structure above is illustrative. Update it to match the actual structure of your project.

## Future Improvements

- Add automated unit and integration tests.
- Improve API documentation.
- Add pagination and filtering where needed.
- Add booking conflict prevention and concurrency handling.
- Add Docker support.

## Author

**Your Name**

- GitHub: https://github.com/mohamedelmrsawy/Airport.git  

---

*This project was developed as a backend application to practice API development, database relationships, authentication, and efficient data fetching.*
