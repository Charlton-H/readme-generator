const generateInstallation = (installationText) => {
  if (!installationText) {
    return "";
  }

  return `
  ## Installation

  ${installationText}
  `;
};

const generateUsage = (usageText) => {
  if (!usageText) {
    return "";
  }

  return `
  ## Usage

  ${usageText}
  `;
};

const generateCredit = (creditText) => {
  if (!creditText) {
    return "";
  }

  return `
  ## Credits

  ${creditText}
  `;
};

module.exports = (templateData) => {
  console.log(templateData);

  return `
  # ${templateData.project}

  ## Description
  ${templateData.description}

  ## Demo

  ![demo](./assets/images/${templateData.demoImage}.${templateData.imageFormat})
  
  [View Live Site Here](${templateData.demoURL})

  ## Built With

  ${templateData.languages}

  ${generateInstallation(templateData.installation)}

  ${generateUsage(templateData.usage)}
  
  ${generateCredit(templateData.credits)}

  ### &copy; ${new Date().getFullYear()} ${templateData.name}
  `;
};
