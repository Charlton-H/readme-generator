// node.js package to prompt users for entry
const inquirer = require("inquirer");
// generateFile is used by this app as a template
const generateFile = require("./src/readme-template");
// writeFile is used to write/putput template
const { writeFile, createFolders } = require("./utils/generate-readme");

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
      },
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
        type: "list",
        name: "imageFormat",
        message: "What format is your image in?",
        choices: ["PNG", "JPEG", "SVG"],
        when: ({ confirmDemoImage }) => {
          if (confirmDemoImage) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "demoImage",
        message:
          "Provide name of your image file: (please remember to save image into the correct folder)",
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
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "Javascript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "confirm",
        name: "confirmInstallation",
        message:
          "Would you like to include an Installation section in your README.md?",
        default: false,
      },
      {
        type: "input",
        name: "installation",
        message: "Provide installation detail: ",
        when: ({ confirmInstallation }) => {
          if (confirmInstallation) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "confirmUsage",
        message:
          "Would you like to include an Usage section in your README.md?",
        default: false,
      },
      {
        type: "input",
        name: "usage",
        message: "Provide usage detail: ",
        when: ({ confirmUsage }) => {
          if (confirmUsage) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "confirmCredits",
        message:
          "Would you like to include an Credits section in your README.md?",
        default: false,
      },
      {
        type: "input",
        name: "credits",
        message: "Provide credits detail: ",
        when: ({ confirmCredits }) => {
          if (confirmCredits) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((projectData) => {
      projectData = {
        name: "Charlton H",
        project: "README GENERATOR",
        description:
          "This project helps users build a quick and easy readme.md file",
        confirmDemoImage: false,
        imageFormat: "PNG",
        demoImage: "readme-demo",
        confirmDemoURL: true,
        demoURL: "yahoo.com",
        languages: ["Javascript", "Node"],
        confirmInstallation: true,
        installation: "install of inquirer npm is necessary",
        confirmUsage: true,
        usage:
          "usagage of this tool is pretty straight foward, after installing inquirer npm, run node app and users will be prompted questions which will be used to create a readme",
        confirmCredits: true,
        credits: "blah",
      };
      return projectData;
    });
};

promptUser()
  .then((projectData) => {
    return generateFile(projectData);
  })
  .then((pageREADME) => {
    return writeFile(pageREADME);
  })
  .then((writeFileReponse) => {
    console.log(writeFileReponse);
    if (projectData.confirmDemoImage) {
      return createFolders();
    }
  })
  .then((createFoldersResponse) => {
    console.log(createFoldersResponse);
  })
  .catch((err) => {
    console.log(err);
  });
