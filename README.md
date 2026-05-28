# AI Test Website 
This repository contains AI generated html, CSS, and JavaScript files which are being used for a portfolio website.

# Steps taken to publish to GitHub
Using PowerShell that is pointing to the directory containing the website files, I first initalized Git, and then set it up using my name and public e-mail provided by GitHub. 
After this I added the GitHub repository as a remote, and pushed the local repository online to GitHub. Everything worked without issue.

# Steps taken to use GitHub Actions workflow
The first step was to switch from auto-publish to GitHub actions in the Pages settings for the repository and then add the deploy.yml to .github/workflows/ in the repository. 
The only challenge was that I forgot to put the workflows folder in a .github folder, which didn't properly register the workflow, but that was an easy fix. 
To trigger the deployment you can push to the master branch or manually run the workflow in the Actions tab on GitHub.
