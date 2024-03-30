# _Home Library Service_
___
## 1. How to run:
### 1.1 Preparations  
__Ensure that you have actual versions of tools.__  
__My ones are listed below:__  
- `$ node --version`  
`v20.11.1`
- `$docker --version`  
`Docker version 26.0.0, build 2ae903e`    
- `$ uname -a`  
`Linux 5.13.0-40-generic #45~20.04.1-Ubuntu`

### 1.2 Cloning & running 
- Clone this repository:   
`git clone https://github.com/user-of-github/nodejs2024Q1-service.git .`
- Switch to actual branch (for task 3 it is `dev-3`, __see actual branch in PR__. Or after course completion it should be just `master`):  
`git checkout dev-3` _// or other actual branch with most recent changes_  
- Ensure that ports are free (:5432, :4000) (see them in `.env`)
  - _Note: On Linux you can use command `sudo lsof -i:5432` and `sudo lsof -i:4000` to check, if ports are free_
- Run `npm install`  
- Uncomment whole `docker-compose`, in `.env` make sure, that `DATABASE_URL` for DOCKER is used (see comments in `env`).  
Run `docker compose up` or `sudo docker compose up`
#### To run app without docker:  
- Run your postgres instance locally from params in `.env` or you just can:  
  - Comment `app` service in `docker-compose` (so only DB will be run in container)
  - in `.env` make sure, that `DATABASE_URL` for LOCAL is used (see comments in `env`)
- Run `npm run start` or `npm run start:dev`.
- Before running, you can check, that 4000 and 5432 ports are free by using command (in Linux): `sudo lsof -i:5432`, `sudo lsof -i:4000`. And kill processes if they occupy these ports (`sudo kill <PROCESS_ID>`)  

![](./demo-for-readme/Screenshot%20from%202024-03-24%2022-59-31.png)  
![](./demo-for-readme/Screenshot%20from%202024-03-24%2023-00-44.png)    
_... WAITING ..._  
![](./demo-for-readme/Screenshot%20from%202024-03-24%2023-02-40.png)   

### 1.3 Testing
- If you haven't done before, `npm install`
- `npm run test` _// in separate terminal :)_
- __DOCKER CONTAINER WITH APP MUST BE ALREADY RUNNING__    
  ![](./demo-for-readme/Screenshot%20from%202024-03-24%2023-04-33.png)

### 1.4 After everything:  
- After testing and using, don't forget to run `sudo docker compose down` (even if you already pressed `ctrl+c` or `ctrl+z` in terminal)
  
![](./demo-for-readme/Screenshot%20from%202024-03-25%2020-33-34.png)  

### 1.5 If you are getting some error when running `compose up`, like this:
`Error response from daemon: driver failed programming external connectivity on endpoint db ...
Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use`,  
then ensure that port is free. You need to stop all running containers, free up port.  
You can check, which process uses this port by using: `sudo lsof -i:5432`. With sudo !! Because without it on my personal machine command showed nothing. And then kill this process

## 2. Docker Hub link to my published image:  
https://hub.docker.com/repository/docker/684684684/rs-nodejs-2024q1-service  

## 3. Technologies used:

* _[TypeScript](https://www.typescriptlang.org/)_
* _[Nest](https://nestjs.com/)_  
* _[Prisma ORM](https://www.prisma.io/) with [PostgreSQL](https://www.postgresql.org/)_ 
* _[Docker](https://www.docker.com/)_

___  

## 4. Features:

* _Every entity is processed within its module_
* _Database has a separate module_
* _Types_
* _Linting_  
* _Launch data stored in `.env`_

___  

## 5. Usage:

* `Users` (`/user` route)
    * `GET /user` - get all users
    * `GET /user/:id` - get single user by id
    * `POST /user` - create user (following DTO should be used)
    * `PUT /user/:id` - update user's password
    * `DELETE /user/:id` - delete user

* `Tracks` (`/track` route)
    * `GET /track` - get all tracks
    * `GET /track/:id` - get single track by id
    * `POST /track` - create new track
    * `PUT /track/:id` - update track info
    * `DELETE /track/:id` - delete track

* `Artists` (`/artist` route)
    * `GET /artist` - get all artists
    * `GET /artist/:id` - get single artist by id
    * `POST /artist` - create new artist
    * `PUT /artist/:id` - update artist info
    * `DELETE /artist/:id` - delete album

* `Albums` (`/album` route)
    * `GET /album` - get all albums
    * `GET /album/:id` - get single album by id
    * `POST /album` - create new album
    * `PUT /album/:id` - update album info
    * `DELETE /album/:id` - delete album

* `Favorites`
    * `GET /favs` - get all favorites
    * `POST /favs/track/:id` - add track to the favorites
    * `DELETE /favs/track/:id` - delete track from favorites
    * `POST /favs/album/:id` - add album to the favorites
    * `DELETE /favs/album/:id` - delete album from favorites
    * `POST /favs/artist/:id` - add artist to the favorites
    * `DELETE /favs/artist/:id` - delete artist from favorites

___  
&nbsp;

###### _Inspired by Rolling Scopes_

###### _Created by Slutski Mikita_

###### _RS NodeJS 2024Q1_
