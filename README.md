# _Home Library Service_
___
## How to run:
### Preparations  
__Ensure that you have actual versions of tools.__  
__My ones are listed below:__  
- `$ node --version`  
`v20.11.1`
- `$docker --version`  
`Docker version 26.0.0, build 2ae903e`    
- `$ uname -a`  
`Linux 5.13.0-40-generic #45~20.04.1-Ubuntu`

### Cloning & running 
- Clone this repository:   
`git clone https://github.com/user-of-github/nodejs2024Q1-service.git .`
- Switch to actual branch (for task 2 it is `dev-2`, __see actual branch in PR__):  
`git checkout dev-2` _// or other actual branch with most recent changes_  
- Ensure that ports are free (:5432, :4000) (see them in `.env`)
- Run `npm install`  
- Run `docker compose up` or `sudo docker compose up`

![](./demo-for-readme/Screenshot%20from%202024-03-24%2022-59-31.png)  
![](./demo-for-readme/Screenshot%20from%202024-03-24%2023-00-44.png)    
_... WAITING ..._  
![](./demo-for-readme/Screenshot%20from%202024-03-24%2023-02-40.png)      
### Testing  
- If you haven't done before, `npm install` 
- `npm run test` _// in separate terminal :)_  
- __DOCKER CONTAINER WITH APP MUST BE ALREADY RUNNING__    
![](./demo-for-readme/Screenshot%20from%202024-03-24%2023-04-33.png)  

## _Docker Hub link to my published image_:  
https://hub.docker.com/repository/docker/684684684/rs-nodejs-2024q1-service  

## _Technologies used:_

* _[TypeScript](https://www.typescriptlang.org/)_
* _[Nest](https://nestjs.com/)_  
* _[Prisma ORM](https://www.prisma.io/) with [PostgreSQL](https://www.postgresql.org/)_ 
* _[Docker](https://www.docker.com/)_

___  

## _Features:_

* _Every entity is processed within its module_
* _Database has a separate module_
* _Types_
* _Linting_  
* _Launch data stored in `.env`_

___  

## _Usage:_

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
