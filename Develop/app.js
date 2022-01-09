// node.js package to prompt users for entry
const inquirer = require("inquirer");
// generateFile is used by this app as a template
const generateFile = require("./src/readme-template.js");
// writeFile is used to write/putput template
const { writeFile, createFolders } = require("./utils/generate-markdown.js");

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your full name?",
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
        message: "What is the title of your README.md?",
        validate: (titleInput) => {
          if (titleInput) {
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
        message:
          "In a brief description, describe the purpose of your project:",
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
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: ["Javascript", "HTML", "CSS", "jQuery", "Bootstrap", "Node"],
      },
      {
        type: "confirm",
        name: "confirmDemoImage",
        message: "Would you like to display a demo image of your project?",
        default: false,
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
        message: `(!Reminder to save image into the correct folder '/assets/images' after)
        Provide name of your image file:`,
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
        name: "sections",
        message:
          "What additional sections would you like to add to this README.md? (Check all that apply)",
        choices: [
          "Installation",
          "Usage",
          "License",
          "Contribution",
          "Tests",
          "Questions",
        ],
      },
      // INSTALLATION
      {
        type: "input",
        name: "installation",
        message: "Enter installation instructions:",
        when: ({ sections }) => {
          if (sections.includes("Installation")) {
            return true;
          } else {
            return false;
          }
        },
      },
      // USAGE
      {
        type: "input",
        name: "usage",
        message: "Enter usage examples:",
        when: ({ sections }) => {
          if (sections.includes("Usage")) {
            return true;
          } else {
            return false;
          }
        },
      },
      // LICENSES
      {
        type: "checkbox",
        name: "license",
        choices: ["MIT", "BSD", "MPL"],
        message: "Select your licenses",
        when: ({ sections }) => {
          if (sections.includes("License")) {
            return true;
          } else {
            return false;
          }
        },
      },
      // CONTRIBUTION
      {
        type: "input",
        name: "contributions",
        message: "Enter comments on how to contribute:",
        when: ({ sections }) => {
          if (sections.includes("Contribution")) {
            return true;
          } else {
            return false;
          }
        },
      },
      // TESTS
      {
        type: "input",
        name: "tests",
        message: "Explain the testing procedures:",
        when: ({ sections }) => {
          if (sections.includes("Tests")) {
            return true;
          } else {
            return false;
          }
        },
      },
      // QUESTIONS
      {
        type: "input",
        name: "username",
        message: "Enter your GitHub username:",
        when: ({ sections }) => {
          if (sections.includes("Questions")) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter your email address:",
        when: ({ sections }) => {
          if (sections.includes("Questions")) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((projectData) => {
      // console.log(projectData);
      // console.log(projectData.confirmDemoImage);
      // projectData = {
      //   name: "Charlton Hua",
      //   project: "ReadMe Generator",
      //   description: "Readme gen for quick and painless",
      //   languages: ["Javascript", "Node"],
      //   confirmDemoImage: true,
      //   imageFormat: "PNG",
      //   demoImage: "demo",
      //   confirmDemoURL: true,
      //   demoURL: "yahoo.com",
      //   sections: [
      //     "Installation",
      //     "Usage",
      //     "License",
      //     "Contribution",
      //     "Tests",
      //     "Questions",
      //   ],
      //   installation: "asdffff inst",
      //   usage: "asdfff use",
      //   license: ["MIT", "BSD"],
      //   contributions: "aassdf contribute",
      //   tests: "asfdfas te",
      //   username: "sfasf",
      //   email: "fffff",
      // };
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
    // this 'if' previously worked and then stopped recognizing value but can console.log on line 223?!?!GRRR
    // if (projectData.confirmDemoImage) {
    //   return createFolders();
    // }
    return createFolders();
  })
  .then((createFoldersResponse) => {
    console.log(createFoldersResponse);
  })
  .catch((err) => {
    console.log(err);
  });
