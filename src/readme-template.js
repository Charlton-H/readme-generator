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

module.exports = (templateData) => {
  return `
  # ${templateData.project}

  ${descriptionSection(
    templateData.description,
    templateData.demoImage,
    templateData.imageFormat,
    templateData.demoURL
  )}

  ${builtWithSection(templateData.languages)}

  ${tableOfContents(templateData.sections)}


  ### &copy; ${new Date().getFullYear()} ${templateData.name}
  `;
};
