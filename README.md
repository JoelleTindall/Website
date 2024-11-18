# JoelleSite

## LATEST UPDATES

#### 11/18/2024
    -Added a dark mode (accessed via clicking little dancing footer thing) (Not quite finished but almost!)
    -Messed with some css (potentially broke things)

#### 11/17/2024
    -created .env.development for running DB in development mode
    -added script to package.json to quickly start frontend and backend server
    -automatically inserts dummy data to guestbook
    -restructured project to seperate frontend and backend better

#### 11/16/2024
    -switched from supabase to postgresql
    -created server.js for backend
    -created backend.Dockerfile
    -Modified docker-compose.yml to account for backend

#### 11/15/2024
    - created docker-compose.yml
    - created joellesite.Dockerfile
    - attached postgre db (no data currently)

#### 11/15/2024
    - created docker-compose.yml
    - created joellesite.Dockerfile
    - attached postgre db (no data currently)

#### 11/14/2024
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

### Install dependencies

```sh
npm install
```

### If wanting DB access..

```sh
docker compose build
docker compose up
```

then either stop back and front end 

```sh
docker stop JoelleVue
docker stop Backend
```

Or stop all (ctrl+c) and start DB container

```sh
docker start my_postgres
```

### Start the dev server

```sh
npm run dev
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
