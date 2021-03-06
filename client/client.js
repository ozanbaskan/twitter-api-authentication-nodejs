const axios = require("axios")
const inquirer = require("inquirer");
require("dotenv").config();


console.log("==================================================================================");
console.log("This is a simple application for implementing basic authentication of twitter api.");
console.log("You will be asked to enter your e-mail, password and username to get authentication.");
console.log("==================================================================================");


let questions = [
    {
      type: "input",
      name: "email",
      message: "Enter your email address: "
    },
    {
        type: "password",
        name: "password",
        message: "Enter your password: "
      },
      {
          type: "input",
          name: "username",
          message: "Enter your username: "
      }
  ];

const program = async () => {
    let email;
    let password;
    let username;
    let answers;

    try {
        answers = await getUserInput();
        email = answers.email;
        password = answers.password;
        username = answers.username;
    } catch {
        console.log("Error while getting user input, try again.\n");
        return program();
    }
    
    try {
        const response = await axios.post(process.env.END_POINT, {
        email, password, username
        });
        console.log(response.data);
        return program();
    } catch (err) {
        console.log(err);
    };
}
    
const getUserInput = () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt(questions).then(answers => {
            resolve(answers);
          }).catch((err) => {
            console.log(err)
            reject(null);
        });
    });
}

program();


