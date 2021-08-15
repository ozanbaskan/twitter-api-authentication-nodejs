## This is a simple console nodejs application to get authentication from twitter for twitter enterprise APIs.

### After installing dependencies with "npm install" from each directory to run this locally:

- Create an .env file in server folder and add a port variable, preferably "PORT=3000".
- Create another .env file in client folder and add an END_POINT variable that matches your serverside port, preferably "END_POINT=http://localhost:3000/".
- Run server side from server directory with "node server.js".
- Run client side from client directory with "node client.js", enter your credentials to see if you get authentication.
- Logs will be saved in local files in server side as json.
