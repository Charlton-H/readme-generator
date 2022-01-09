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

const renderBuiltWithLink = (lincense) => {
  const licenseObj = {
    Javascript:
      "![Built with: Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)",
    HTML: "![Built with: HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)",
    CSS: "![Built with: CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)",
    jQuery:
      "![Built with: jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)",
    Bootstrap:
      "![Built with: Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)",
    Node: "![Built with: Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)",
  };
  return licenseObj[lincense] || "";
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
  return `
## Installation
  
${installation}
  `;
};

const usageSection = (usage) => {
  return `
## Usage
  
${usage}
  `;
};

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

const contributionSection = (contribution) => {
  return `
## Contribution
  
${contribution}
  `;
};

const testsSection = (tests) => {
  return `
## Tests
  
${tests}
  `;
};

const questionsSection = (username, email) => {
  return `## Questions
  
All questions maybe directed to the contact information listed below.

Github: ${username}
Email: ${email}
  `;
};

module.exports = (data) => {
  const licenseLinks = data.license.map((license) => {
    return renderLicenseLink(license);
  });

  const licenseSection = (license) => {
    return `
  ## License
    
  ${licenseLinks.join(" ")}
    `;
  };

  const builtLicenseLinks = data.languages.map((languages) => {
    return renderBuiltWithLink(languages);
  });

  const builtWithSection = (languages) => {
    return `
  ## Built With
  
  ${builtLicenseLinks.join(" ")}`;
  };

  return `
  ${licenseLinks.join(" ")}

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
