require("dotenv").config();
const express = require("express");


// create log file if not exists
const logCreated = require("./helpers/writeLogs.js").createLogIfNotExists("./logs/log.json");

const app = express();

const routes = require("./routes/index.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((req, res, next) => {
    const err = { message: "Endpoint is not found.", status: 404};
    next(err);
})

app.use((err, req, res, next) => {
    if (err.status === 404)
    {
        res.status(err.status);
        res.json(err);
    } else {
        res.json("Something went wrong");
    }
    
    console.log(err);

})


const server = app.listen(process.env.PORT, () => {
    console.log("Server is online!");
});


// if log file is not created, end server
if (!logCreated) {
    console.log("Log file could not be created.")
    server.close();
}