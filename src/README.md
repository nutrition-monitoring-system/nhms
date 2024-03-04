# How to run the project

## Prerequisites

To run this project, you must install 2 things:

- `node` which can be installed from [here.](https://nodejs.org/en/download)
`node` is used for installing all packages for this project.

- `postgres` which can be installed from [here.](https://www.postgresql.org/download/)
`postgres` is the relational database used. This will require your own database in a specific format, see the [database folder](database) for more info.

## Steps

This tutorial assumes you are using `git bash` or an alternative Bourne-again shell.

1. Use `git clone` to clone the workspace to your own machine.

2. Navigate inside the directory, using `cd src`. The `src` directory is the **working directory** for all files from now on.

3. Run `npm ci` to clean install the packages, from the `package.json` file.

4. Now, we need to set up the database. There are two ways of doing this:

    - Running the [`nhms.sql`](database/nhms.sql) file, as a SQL script.

    - Using a `prisma` command to migrate the prisma schema in the [prisma](prisma) folder, to a database on the machine.

5. Create a `.env` file. This needs to have the reference to the database URL, so that Prisma can actually add data to the local database on the machine, from the application.

    This can be done by creating a new file using `touch .env`.

6. Inside the `.env` file, add:

    ```sh
    DATABASE_URL = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

    replacing
     `USER` with the postgres username,
      `PASSWORD` with the postgres password, `HOST` which would be `localhost` if accessing the database on your local machine,
      `PORT`, generally `5432` and
      `DATABASE`, for the database name, normally `nhms`.

Now, the application should be ready to go. You can start the application using `npm run dev`, in order to run the development server.

## Production

To run the production version, you will get an error if `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are not defined.

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

This project has `CI/CD` integration using GitHub actions. These workflow files are located inside the [`.github` folder here.](../.github/workflows/)

- The first file `CI_testing.yml` runs all the Cypress tests from the [Cypress testing folder.](cypress)

- The second file `eslint.yml` runs the `eslint` configuration defined in the [`eslintrc.json` file.](.eslintrc.json)

The CI/CD testing on GitHub Actions runs on the production database, which is a AWS cloud database.

Please ask the current maintainer if you require the endpoint to the production database.
