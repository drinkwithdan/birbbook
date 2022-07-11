# Birb-book

### A birdspotter's log book

Birb-book will allow bird-spotting enthusiasts to access, edit and add to a collection of logs for bird spottings. Each log will contain:

(MVP)
 - Log date
 - Location
 - Bird name
 - Notes

(Stretch goals)
 1. Users collection with login and sessions (can only post / edit when logged in)
 2. Birds collection with link for `More info` about the relevant bird
 3. Locations map API


#### App requirements
 - Node.js
 - Express
 - MongoDB & Mongoose
 - EJS
 - method-override
 - dotenv
 - Bootstrap
 - Heroku

### MVC

#### Models

 Logs
 - id
 - Date
 - Location
 - Bird Name
 - Photo?
 - Notes

Users / Sessions
 - User name & password
 - Sessions

Birds
 - Name
 - Image
 - Endangered?
 - Notes

#### Views

Index `/logs`
  - Flexbox containing all the available logs
  - New log button to shows view
  - Login functionality (Stretch goal 1)
  - Map w/ logs (Stretcj goal 3)

Show `/logs/:id`
 - Log details
 - Edit button (Only when logged in for stretch goal 1)
 - Delete button

New `logs/new`
 - Forms for new log details

Edit `logs/:id/edit`
 - Forms to edit a log's details

### Controllers

###### logsController
Basic functionality of creating, editing and viewing all of the logs in the database. 7 RESTful routes.

###### usersController
Controls create new user funcionality as well as login / logout actions and login gate for new / edit routes. 7 RESTful routes. Encryption via `bcrypt`.

###### birdsController
Accessing and editing birds database.




