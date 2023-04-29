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
      type: 'confirm',
      name: 'addVideo',
      message: 'Would you like to add a video file path to the README? (Optional)',
    },
    {
      type: 'input',
      name: 'thumbnailPath',
      message: 'Please provide the file path for the video thumbnail (e.g. ./media/thumbnail.png). (Optional)',
      when: (answers) => answers.addVideo,
    },
    {
      type: 'input',
      name: 'videoPath',
      message: 'Please enter the file path for the video (e.g., ./media/video.mp4).  (Optional)',
      when: (answers) => answers.addVideo,
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
      type: 'list',
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
    const markdownContent = generateMarkdown(data);
    fs.writeFile('README.md', markdownContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!'));
  });



function generateMarkdown(data) {
  const { title, description, installation, usage, contribution, license, test, github, email } = data;
  const videoPath = data.videoPath || '';
  const thumbnailPath = data.thumbnailPath || '';
  const videoMarkdown = videoPath
    ? `[![Video Thumbnail](${thumbnailPath})](${videoPath})
       \nClick the thumbnail above to view the video.`
    : '';
  return `
  ## License
  \n${renderLicenseBadge(data.license)}
  
    
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

  ${videoMarkdown}

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
  let licenseLink = '';
  if (license === 'MIT') {
    yourLicense = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
    licenseLink = 'https://choosealicense.com/licenses/mit/';
  }
  if (license === 'Apache') {
    yourLicense = '![License: Apache](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
    licenseLink = 'https://choosealicense.com/licenses/apache-2.0/';
  }
  if (license === 'GPL') {
    yourLicense = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
    licenseLink = 'https://choosealicense.com/licenses/gpl-3.0/';
  }
  if (license === 'BSD') {
    yourLicense = '![License: BSD](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)';
    licenseLink = 'https://opensource.org/license/BSD-3-clause/';
  }

  const licenseMd = `[${yourLicense}](${licenseLink})`
  return licenseMd;
}