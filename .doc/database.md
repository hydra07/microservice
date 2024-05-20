# USING DOCKER TO RUN MONGODB & POSTGRESQL

## MongoDB

pull docker image

```bash
docker pull mongodb/mongodb-community-server:latest
```

then run the image

```bash
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

## PostgreSQL

pull docker image

```bash
docker pull postgres:latest
```

then run the image

```bash

docker run --name postgres -e POSTGRES_USERNAME=hydra07 -e POSTGRES_PASSWORD=1210 -p 5432:5432 -d postgres:latest
```

connet to the database

```bash
PGPASSWORD=1210 psql -h localhost -p 5432 -U hydra07
```

then using sql to create database

```sql
CREATE DATABASE api;
```

show list of database

```sql
\l
```

```bash
hydra07=# \l
                                                     List of databases
   Name    |  Owner  | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |  Access privileges
-----------+---------+----------+-----------------+------------+------------+------------+-----------+---------------------
 api       | hydra07 | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 hydra07   | hydra07 | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 postgres  | hydra07 | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           |
 template0 | hydra07 | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/hydra07         +
           |         |          |                 |            |            |            |           | hydra07=CTc/hydra07
 template1 | hydra07 | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/hydra07         +
           |         |          |                 |            |            |            |           | hydra07=CTc/hydra07
(5 rows)
```
