# Decks and Flashcards REST API

## Résumé

A REST API configured for usage with Postgres database using NestJS and TypeORM

Includes user registration and access token based authentication, routes for creating Decks of Questions and answers, rating them and resetting the states.

## Local installation instructions

#### Pre-requisites:

Make sure you have a running Postgres server on your machine and have created a database using your Postgres administration tool of choice (like pgadmin4 or JetBrains DataGrip)

#### Installation steps

- Clone this repository
  ```bash
  $ git clone https://github.com/Shkettoe/api
  $ cd api
  ```
- Install the dependencies

  ```bash
  $ npm install
  ```

- Copy .example.env file into .env file and add your database credentials into it

  ```bash
  $ cp .example.env .env
  $ vim .env
  # You can use any text editor you want to edit .env file
  ```

- Migrate TypeORM schema into your Database
  If you want to run migrations manually, after a fresh install run the command:
  ```bash
  $ npm run migration:run
  ```
  If you don't want to deal with migrations, in ormconfig.ts in the root of the directory, change the `synchronize` property to `true`
  ```bash
  $ sed -i "s/synchronize: false/synchronize: true/" ./ormconfig.ts
  ```
- Put a random hash as a value for JWT_SECRET_KEY field in .env. This is mandatory to ensure the proper functioning of the authentication system and of the entire application as a matter of fact.

```bash
  $ echo random_string | sha256sum
  # or just loop up some random long hash generators online
```

- Running the application
  ```bash
  # development
  $ npm run start
  # watch mode
  $ npm run start:dev
  # prod
  $ npm run start:prod
  ```
  If you haven't changed the`APP_PORT`property of .env, api will be available at http://localhost:5000

## Database adjustment

If you are going to make any adjustments to the TypeORM entities and schema; and are running migrations manually, make sure to run

```bash
  $ npm run migration:generate --name=[name your migration]
  $ npm run migration:run
```

after every change.
