# JoelleSite

## LATEST UPDATES

11/17/2024
    -created .env.development for running DB in development mode
    -added script to package.json to quickly start frontend and backend server
    -automatically inserts dummy data to guestbook

11/16/2024
    -switched from supabase to postgresql
    -created server.js for backend
    -created backend.Dockerfile
    -Modified docker-compose.yml to account for backend

11/15/2024
    - created docker-compose.yml
    - created joellesite.Dockerfile
    - attached postgre db (no data currently)

11/15/2024
    - created docker-compose.yml
    - created joellesite.Dockerfile
    - attached postgre db (no data currently)

11/14/2024
    - added admin page accessed through /signin and credentials test and test
    - admin allows deletion of guestbook entries
    - created guestbook admin component (finishedish) and project admin component (basically blank)
    - created auth.js for authentication purposes
    - updated router.js
    - guestbook now has reactions you can add when posting
    - separated views and components to their own files n folders

## TO DO

in order:

- learn how to format readme files correctly
- implement secure authentication
- project admin
- cookie if you've already left a guestbook message that day
- news section (updatable via admin page)
- clean up css
- have a nap

# Project Setup

### Install Docker

https://docs.docker.com/get-started/get-docker/

## For Development

### Make sure DB container is built

```sh
docker compose build
```

### Start the DB container

```sh
docker start my_postgres
```

### Start the dev server

```sh
npm run build
```

## For Deployment

### Build Image

```sh
docker compose build
```

### Run Image

```sh
docker compose up
```
