
# Installation

Be sure to download, node (& npm) and mongodb.

To locall test you need to run, node, webpack and mongo.

Open 3 terminals
Run - mongod
Run - node index.js
Run - webpack-dev-server


# Guide to Dev

In our server folder we have server application, that serves the front end react app. The server also acts as the API end point, allowing interaction with the database. It also implements and handles all of the security through json web tokens.

The entry to this server is index.js, that simply instantiates the server from server.js.
The command 'node index.js', starts this server (ensure mongodb is running also).


Working on the front end can be done through the app folder. We tried to keep a seperation of concern between containers (handle api calls,data and state) and components (purely aesthetical components), this was to keep our front end work flow simplified and more modularised.
Our front end uses the react framework. To run and serve our front end we must use webpack to bundle and compile all of our code. To do this run the command 'webpack-dev-server'



Pushing to prod.
Any changes that you wish to move to production can be done by merging the current branch into the production branch. You must then run the command 'wepback -p' to recompile the front end part of the application. Then push these changes to the given heroku server.