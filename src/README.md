# How to run the project

## Prerequisites

To run this project, you must install 2 things:

- `node` which can be installed from [here.](https://nodejs.org/en/download)
`node` is used for installing all packages for this project.

- `postgres` which can be installed from [here.](https://www.postgresql.org/download/)
`postgres` is the relational database used. This will require your own database in a specific format, advice on setting up the database can be found below.

## Setting up a fresh database

By default, Postgres creates a new user with the same username you use on your system. This user is defined as the **superuser**.

> **NOTE:** If giving roles to anyone, it is inadvisable to give them a *superuser* role, as this allows them all permissions.

For best practise, it is advisable to make a new user.

This can be done by logging into the new user and opening the default `postgres` database, by opening a terminal, and typing in:

```sh
psql postgres
```

This will display the `postgres` prompt terminal.

To list all databases, you use:

```sh
\l
```

We want to create a new `postgres` user, called `nhms`and a new database, also called `nhms`.

We can check all current users and their permissions using:

```sh
\du
```

At this point, if you are using a fresh install of `postgres`, you should only have one user, that of your user account.

To create a new user, connect to the postgres database using:

```sh
\c
```

and run:

```sql
CREATE ROLE nhms WITH LOGIN CREATEDB;
```

This creates a new user called `nhms`, who can create databases, and can login.
 You can add a password using `PASSWORD 'whateverpassword'` to the end of the SQL statement.

To now login using the `nhms` user, use:

```sh
\c postgres nhms
```

which allows you to connect to the `postgres` database as the `nhms` user.

Now, to create a new database, with the name `nhms`, we write:

```sql
CREATE DATABASE nhms;
```

To check if there are any tables inside the `nhms` user, use;

```sh
\d
```

We can now connect to the nhms database with the nhms user, by using:

```sh
\c [DATABASENAME] [USERNAME] 
```

> **NOTE:** It is advisable to use a GUI framework to edit and connect to databases. The one primarily used in this project was [DBeaver](https://dbeaver.io/download/), but you can also use [pgAdmin](https://www.pgadmin.org/) for Postgres specific usecases.

## Steps

This tutorial assumes you are using `git bash` or an alternative Bourne-again shell.

1. Use `git clone` to clone the workspace to your own machine.

2. Navigate inside the directory, using `cd src`. The `src` directory is the **working directory** for all files from now on.

3. Run `npm ci` to clean install the packages, from the `package.json` file.

4. Create a `.env` file. This needs to have the reference to the database URL, so that Prisma can actually add data to the local database on the machine, from the application.

    This can be done by creating a new file using `touch .env`.

5. Inside the `.env` file, add:

    ```sh
    DATABASE_URL = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

    replacing
     - `USER` with the postgres username (`nhms` if the tutorial above was followed to create a new user),
     - `PASSWORD` with the postgres password(optional if a password was not defined),
     - `HOST` which would be `localhost` if accessing the database on your local machine,
     - `PORT`, generally `5432` and
     - `DATABASE`, for the database name, normally `nhms`.

     The database URL inside the `.env` file should now look like this(if following the defaults)

     ```sh
    DATABASE_URL = "postgresql://nhms:@localhost:5432/nhms"
    ```

6. Now, we need to set up the database. This is done by using  `npx prisma db push` command to *push* the prisma schema in the [prisma](prisma) folder, to the database on the machine. This is required as the `schema.prisma` file in the `prisma` folder uses the environment variable `DATABASE_URL` to get the database URL for updating the schema.

Now, the application should be ready to go. You can start the application using `npm run dev`, in order to run the development server.

## Production

To run the production version of the application, you will get an error if `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are not defined.

To define these, you must add:

```sh
    NEXTAUTH_URL = "localhost:3000/api/auth"

    NEXTAUTH_SECRET = ""
```

to the `.env` file.

If a different port is being used, instead of `3000`, then this must be reflected in `NEXTAUTH_URL`.

To create a secret value for `NEXTAUTH_SECRET`, you must run the command:

```sh
openssl rand -base64 32
```

to generate a key, and copy and paste it into the `.env` file.

After this has been completed, run:

```sh
npm run build && npm run start
```

## CI/CD

This project has `CI/CD` integration using GitHub Actions. These workflow files are located inside the [`.github` folder here.](../.github/workflows/)

- The first file `CI_testing.yml` runs all the Cypress tests from the [Cypress testing folder.](cypress)

- The second file `eslint.yml` runs the `eslint` configuration defined in the [`eslintrc.json` file.](.eslintrc.json)

The CI/CD testing on GitHub Actions runs on the production database, which is a AWS cloud database.

**Please ask the current maintainer if you require the endpoint to the production database.**
