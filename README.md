# Iso Athletic Scrimmage App

## Getting started

This is for anyone getting started with the code. First you need to pull down the code with the following command.

```git clone https://github.com/iso-athletic/iso-app.git```

This will create a new folder on your device called `iso-app`. Navigate into the folder, then run:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
> If you do not have `npm` or `node.js` installed, this will not work. Please following these directions to install these [npm.js](https://docs.npmjs.com/getting-started/installing-node#Related-CLI-Commands). 

Once you have these installed, these commands will open a new window on your browser at localhost:8080. You can make changes to the code and they should reload in the browser window. 

## Working on a feature

First and foremost, before anything else, make sure that you are up to date with the `master` branch by running `git branch` to make sure you are on the branch `master` and then running:

``` git pull```

This will collect the latest changes if there are any. You should run this frequently to ensure there will be minimal merge conflicts. Next, you need to create your own branch on which to work. The naming convention should be `feature/name-of-changes`. The command is as follows:

```git checkout -b "feature/name-of-changes"```

You can now make whatever changes you want. Remember to keep things small and commit often. 

## Committing

After you've completed your change, you need to push them up to the remote repository. First run the command:

``` git add .```

This will index all the changes you've made to your branch since starting work on it. Then, run:

``` git commit -m "describe the changes you made"```

This will stage the commits and leave a message for what you were working on specifically. The final step is to push the staged commits to the remote repository.

``` git push origin feature/name-of-changes ```

You should see a success message after this command. Now, if you navigate to the repository on Github, you should see that there is a branch with the changes you made. Go to the `branches` tab, find your branch, and select `New pull request`. Follow the prompts and create the pull request. Someone else on the team has to review your code before it can be merged into master. Once it has been reviewed, the branch can be merged from the Github GUI and the branch can be deleted. 
