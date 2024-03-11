# _Home Library Service_
## [ATTENTION!]:  How to run  
* _Node.js 20+ required_  
* _Clone repository_  
* _Run `npm install` from root_  
* *__[ATTENTION:]__* _Clone `.env.example` file to `.env` in project root_  
* _Run dev-server with `npm run start:dev` or just `npm run start`_  
* _After that you can run tests: `npm run test`_
___  
## _Technologies used:_  
* _[TypeScript](https://www.typescriptlang.org/)_  
* _[Nest](https://nestjs.com/)_
___  
## _Features:_  
* _Every entity is processed within its module_  
* _Database has a separate module_  
* _Types_  
* _Linting_  
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
