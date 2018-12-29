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

> If nothing happens, try `git pull origin master`. This explicity sets the reference you want to get. 

This will collect the latest changes if there are any. You should run this frequently to ensure there will be minimal merge conflicts.

On the off chance that other packages were installed in the latest merge, run this.

``` npm install ```

This will install any new packages. Next, you need to create your own branch on which to work. The naming convention should be `feature/name-of-changes`. The command is as follows:

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

## Using the Scrimmage App (product testing)

### Overview
The Scrimmage App has all the bare minimum functions that it will have as a completed product without the ability to save any data that was recorded. There is a lot to be desired, but for product testing purposes, this should work and it will only get better from here.  

### Features
1. Timer
Press Start to start, Reset to reset. Change the timer duration by directly clicking on the numbers.
2. Actions
Click on the corresponding action you wish to record.
3. Team View
To add a player click on the "+" icon, and select the player you wish to add to a team from the dropdown menu.
4. Court View
Click on the court view where the recorded action occured.
5. Event Log
The event log keeps track of the different events recorded. An event will be automatically recorded once the following conditions are met: the timer is running, a player has been selected, an action has been selected, and a position on the court has been selected. Each event will display the player, the player's action, the time at which this event occured, and a x, y coordinate that can be ignored for now, but represents the position on the court the action occurred. 
6. Scoreboard
Increment the score by pressing the corresponding +1, +2, or +3 button accordingly. Reset the score by pressing the "reset" button. 

### Product Testing
Use the features the way they are designed to be use. The completed application will have a much better UI and therefore should be easier to navigate, but this current version has all the necessary functionality. Once finished, take screenshots of the event log so that we can compare the data afterwards. 

### SonarQube Link
https://sonarcloud.io/dashboard?id=iso-athletic_iso-app-web
