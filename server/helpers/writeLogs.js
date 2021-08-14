const fs = require("fs");

// there are two functions, one is runned when there is a request to save logs
// other one is runned when the server is started to ensure there is log file to write

const writeLogs = (log) => {
    let logJson = fs.readFileSync("./logs/log.json","utf-8");
    let logs = JSON.parse(logJson);
    logs.push(log);
    logs = JSON.stringify(logs);
    fs.writeFileSync("./logs/log.json",logs,"utf-8");
}

const createLogIfNotExists = (logDir) => {
    if (fs.existsSync(logDir)) return true;

    fs.appendFile(logDir, "[]", (err) => {
        if (err) 
        {
            console.log(err);
            return false;
        }
        console.log("Log file created.");
      });

    return true;
}

module.exports = {createLogIfNotExists, writeLogs};