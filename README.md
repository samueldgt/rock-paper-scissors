# rock-paper-scissors

A configurable "rock, paper & sissors" game developed with Node.js + Express in the server side, and React + Redux for the client

Follow the next steps to run the app in your machine

Pre-requisites:

  - Nodejs and NPM installed.
  - MongoDB installed.

Fast Start:

  - CLone this repo
  - Open the project folder in a terminal, cd in "/server", run "npm install" and then "npm run server" (keep this terminal window open with the server running).
  - Open the project folder in a new terminal, cd in "/client", run "npm install" and then "npm start" (keep this terminal window open with the client running).
  - Go to "http://localhost:3000/" and enjoy.

Getting started (detailed):

  1. CLone this repo in clour computer or download the forlder.
  2. Open the proyect folder in a terminal
  
  --- The server
  
  3. First cd into the "/server" folder and run the command "npm install"
  4. Next, at the same "server" folder run the command to start the server "npm run server" 
    - If everything is ok there must be a console message with the text "server is running on PORT..." and "Database has been connected"
    - If the server doesn't run try changing the PORT, openning the "/server/.env" file with your editor and changing the SERVER_PORT value to another, by default the app runs on PORT 3001.
    - Let the server running at this terminal window.
  
  --- The client

  5. Open a new terminal window, Go to the root folder again, then cd into "/client" and run the command "npm install", 
  6. Then when everyting is done in the terminal, run the command "npm start" to run the client app
    - If everithing is ok there must be a console message with the text "Compiled successfully!" and you can now view the client in the browser at "http://localhost:3000/"
    - If you changed the server PORT before in the step 4, you have to configure it in the client too, if so, open the file at "/client/src/env.js" and set the PORT to the same number you used before in "/server/.env"
  
  --- The Database

  7. if you have mongoDB installed in your machine everything must set up automatically, but just in case, the database port is 27017 by default in mongoDB, if the database doesn't work go to "/server/.env" file and change the database port defined in the DB_URL value
  8. Enjoy playing at "http://localhost:3000/" :)

Developer: Samuel Gonzalez
