# JoelleSite

## LATEST UPDATES

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


- switch from supabase to postgre
- project admin
- cookie if you've already left a guestbook message that day
- news section (updatable via admin page)
- clean up css
- have a nap

## Project Setup

### Install Docker

https://docs.docker.com/get-started/get-docker/

### Build Image

```sh
docker compose build
```

### Run Image

```sh
docker compose up
```
