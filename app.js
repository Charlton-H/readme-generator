const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "project",
      message: "What is the name of your project?",
      validate: (projectInput) => {
        if (projectInput) {
          return true;
        } else {
          console.log("Please enter a project name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "description",
      message: "In a brief description, what is the purpose of your project?",
      validate: (descriptionInput) => {
        if (descriptionInput) {
          return true;
        } else {
          console.log("Please enter a project description!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmDemoImage",
      message: "Would you like to display a demo image of your project?",
      default: true,
    },
    {
      type: "input",
      name: "demoImage",
      message: "Provide location of your image file: ",
      when: ({ confirmDemoImage }) => {
        if (confirmDemoImage) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmDemoURL",
      message: "Would you like to include a live URL to your project?",
      default: false,
    },
    {
      type: "input",
      name: "demoURL",
      message: "Provide URL of your live project site: ",
      when: ({ confirmDemoURL }) => {
        if (confirmDemoURL) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};
