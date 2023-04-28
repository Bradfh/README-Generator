const inquirer = require('inquirer');
const fs = require('fs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project? (Required)',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please provide a description of your project. (Required)',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Please provide installation instructions for your project. (Required)',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please provide usage information for your project. (Required)',
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Please provide contribution guidelines for your project. (Required)',
    },
    {
      type: 'checkbox',
      name: 'license',
      message: 'Please select a license for your project. (Required)',
      choices: ['MIT', 'Apache', 'GPL', 'BSD', 'None'],
    },
    {
      type: 'input',
      name: 'test',
      message: 'Please provide test instructions for your project. (Required)',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Please provide your GitHub username. (Required)',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please provide your email address. (Required)',
    },
  ])
  .then((data) => {
    console.log(data);
    const markdownContent = generateMarkdown(data);
    fs.writeFile('test.md', markdownContent, (err) =>
      err ? console.log(err) : console.log('Successfully created test.md!'));
  });

  
  
  function generateMarkdown(data) {
  const { title, description, installation, usage, contribution, license, test, github, email } = data;
  return `
  ## License
  ${renderLicenseBadge(license)}
    
  ${title}
  
  ## Description
  ${description}
    
  ## Table of Contents
    
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution](#contribution)
  - [Test](#test)
  - [Questions](#questions)
  - [License](#license)

  ## Installation
  ${installation}

  ## Usage
  ${usage}

  ## Contribution
  ${contribution}

  ## Test
  ${test}

  ## Questions
  If you have any questions, please contact me at ${email} or visit my GitHub page at https://www.github.com/${github}
  `
}




function renderLicenseBadge(license) {
  let yourLicense = '';
  if (license === 'MIT') {
    yourLicense = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
  }
  if (license === 'Apache') {
    yourLicense = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
  }
  if (license === 'GPL') {
    yourLicense = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
  }
  if (license === 'BSD') {
    yourLicense = '![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)';
  }
  return yourLicense;
}