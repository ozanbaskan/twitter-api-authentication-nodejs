const axios = require("axios");
const fs = require("fs");

const writeLogs = require("../helpers/writeLogs.js").writeLogs;

// controller for authorization
const twitter = async (req, res, next) => {

    let response;
    
    if (!req.body.email || !req.body.password || !req.body.username || req.body.email.trim().length === 0 || req.body.password.trim().length === 0 || req.body.username.trim().length === 0)
    {
        res.json("Missing required fields");
        return;
    }

    //encode email and password
    let auth = 'Basic ' + Buffer.from(req.body.email + ':' + req.body.password).toString('base64');
   
    try{
        response = await axios.get(`https://gnip-api.twitter.com/search/30day/accounts/${req.body.username}/prod/counts.json?query=from%3Atwitterdev`, {
              headers: {
                Authorization: auth
              }
          });
    } catch (e) {
        if (e.response)
        {
            // Here is the error we get if password or ID is incorrect
            // We will get the error logs from here
            if (e.response.status === 401 || e.response.status === 403)
            {
                // I may not write logs to json if authentication or authorization failed.
                let failLog = e.response.data.error;
                writeLogs(failLog);
            }
            // send user the error message
            res.json(e.response.data.error.message);
        }
        else {
            next(e);
        }
        return;
    }
    
    if (response)
    {
        // if successfull, append to logs
        writeLogs(response.data);
        // send user the message
        res.json("Authentication is successful");
    }
};

module.exports = twitter;