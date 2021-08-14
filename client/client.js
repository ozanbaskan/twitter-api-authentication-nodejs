const axios = require("axios")
const inquirer = require("inquirer");
const { async } = require("rxjs");
require("dotenv").config();


console.log("==================================================================================")
console.log("This is a simple application for implementing basic authentication of twitter api.")
console.log("You will be asked to enter your e-mail, password and username to get authentication.")
console.log("==================================================================================")

process.stdin.setEncoding("utf8");

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
  ]

const program = async () => {
    let email;
    let pw;
    let username;

    let answers = await getUserInput();

  axios
  .post(process.env.END_POINT, {
    email, pw, username
  })
  .then((res) => {
    console.log(res.data);
    program();
  })
  .catch((error) => {
    console.error(error);
  })

}
    
const getUserInput = () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt(questions).then(answers => {
            resolve(answers);
          }).catch((error) => {
            console.log(error)
            reject(null);
        });
    })
}


program();


