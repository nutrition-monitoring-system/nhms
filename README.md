# Team δ: Nutrition Health Monitoring System

This repository holds the source code for the nutrition health monitoring system.

It is made up of a front end, a back end + a database.

## File structure

[`/src`](/src) is where all code files are kept.

[`/res`](/res) is for all 'static' assets like images and videos.

[`/test`](/test) is for all test files, and should mirror the layout of the [`src`](/src) folder.

**SQL Commands**

To dump the SQL table from your current mysql session, use `mysqldump -u root -p mydb > test/nhms.sql` replacing root with your MySQL username. You will be prompted for your password.

To import the table from a `.sql` file use `mysql -u root -p mydb < test/nhms.sql`.


**Updating the Prisma schema.**

To update the Prisma database run `npx prisma db pull`. Then run `npx prisma generate`. 