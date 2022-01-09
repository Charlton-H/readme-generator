const descriptionSection = (description, demoName, demoFormat, liveSite) => {
  const demoSection = (demoImage, demoFormat) => {
    return `
  ## Demo
    
  ![demo](./assets/images/${demoImage}.${demoFormat})
  `;
  };

  const liveSiteSection = (liveSite) => {
    return `[View Live Site Here](${liveSite})`;
  };

  if (demoName && liveSite) {
    return `
  ## Description
    
  ${description}

  ${demoSection(demoName, demoFormat)}

  ${liveSiteSection(liveSite)}
  `;
  } else if (!demoName) {
    return `
  ## Description
    
  ${description}

  ${liveSiteSection(liveSite)}
  `;
  } else if (!liveSite) {
    return `
  ## Description
      
  ${description}
  
  ${demoSection(demoName, demoFormat)}
  `;
  }
};

const builtWithSection = (languages) => {
  return `## Built With

  ${languages}`;
};

const tableOfContents = (contents) => {
  const renderContents = () => {
    const makeContents = contents.map((contents) => {
      return `* [${contents}](#${contents})`;
    });
    return makeContents.join("\n");
  };

  if (!renderContents(contents)) {
    return "";
  } else {
    return `
  ## Table of Contents
    
  ${renderContents(contents)}
  `;
  }
};

const installationSection = (installation) => {
  return `## Installation
  
  ${installation}
  `;
};

const usageSection = (usage) => {
  return `## Usage
  
  ${usage}
  `;
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  const makeBadge = license.map(
    (license) =>
      `![License: ${license}](https://img.shields.io/badge/License-${license}-yellow.svg)`
  );
  return makeBadge.join(" ");
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  var licenseOBJ = {
    MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    BSD: "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    MPL: "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
  };
  return licenseOBJ[license] || "";
}

const licenseSection = (license) => {
  return `## License
  
  ${license}
  `;
};

const contributionSection = (contribution) => {
  return `## Contribution
  
  ${contribution}
  `;
};

const testsSection = (tests) => {
  return `## Tests
  
  ${tests}
  `;
};

const questionsSection = (username, email) => {
  return `## Questions
  
  All questions maybe directed to the contact information listed below.

  ${username}
  ${email}
  `;
};

// var licenseLinks = input.license.map(license => {
//   return renderLicenseLink(license)
//   }
// )
// console.log(typeof input.license);
// return `
// ${renderLicenseSection(input.license)}

module.exports = (data) => {
  return `
  # ${data.project}

  ${descriptionSection(
    data.description,
    data.demoImage,
    data.imageFormat,
    data.demoURL
  )}

  ${builtWithSection(data.languages)}

  ${tableOfContents(data.sections)}

  ${installationSection(data.installation)}

  ${usageSection(data.usage)}

  ${licenseSection(data.license)}

  ${contributionSection(data.contribution)}

  ${testsSection(data.tests)}

  ${questionsSection(data.username, data.email)}

  ### &copy; ${new Date().getFullYear()} ${data.name}
  `;
};
