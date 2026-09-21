# QuestGuard: Main Repo

## Presentation & File Structure:
The folders here are organized by importance.
- Design: All files in YAML regarding design: classes, races, etc
- WebsiteReact2: Contains the front-end of the app.
- Automation: Contains scripts for mapping Design to Website (and other)
- Other: Simply other stuff related to the game

- HomebrewMaterials: tools/materials for homebrew (probably deprecated)
- Old Site: an archive of the website from the olden days (deprecated)

## A. Working on Features
All the work you need to do is in /Design.

### i. If you have new files...
If you have any new files, you must open Automation/sets-config.json and add those files to the respective set's "fileNames".

### ii. Make files appear in website repo
To make those files apprea in the website repo, you need to run a script:
- cd Automation
- ./parse.bat --all
NOTE: All basic files will be there, but all premium features are truncated! The full premium files are generated in GeneratedPremiumFiles/_SetName_.

### iii. Update files in the cloud
To make the premium files appear in the cloud (Firebase), you need to do a series of updates:
- cd Automation
- node ./update-sets-in-firebase.mjs _setname_
Now the changes have been pushed to Firebase, but work is not done yet!

The script also generated the config of sets (sets-config.json), in the same folder, and in the web dev repo (WebsiteReact2/public) and also in the website deployment repo (call-of-heroes-dev).

You now need to push the changes in the website deployment repo (it will just be the new generated sets-config).

The new files will be accessible to all users!


## B. Web Dev

## C. Automation

### How to: Add new "package" (e.g. Weapons)
Currently, you can only push 2 package types to the cloud in Firebase: races and classes.
To add a new type of package to the cloud in Firebase, you must follow some steps.

a. Prerequisites:
    - the new package must be a folder with one or more design files inside.
    - Add it to the *packages* list of any set from `Automation/sets-config.json`
    - Make sure there are files of that package in the list

b. Open update-sets-in-firebase.mjs
    - Add a comment with `- Feature Name` in the help text. 
    - Add a strategy to updateSetAsync

c. Open generate-jsons-from-yaml.mjs;
    - Add a strip strategy to `// Strip of features`

d. Update ContentProvider
    - Open WebsiteReact2/src/.../ContentProvider.js
    - Starting from useFeatureItem, make sure this implementation exists everywhere it's necessary.
    - Add new keys to everywhere necessary
    - You will probably need to also add a special implementation for a provider for that feature type. Follow the examples for RaceProvider and ClassProvider.
    - If your file is a _composite file_ made from multiple files with the same name, follow the example of `OtherProvider.js`

e. Run `.\parse.bat --all`
f. Run `node .\update-sets-in-firebase.mjg <Package Name>`

You may also want to create a base version of that file without the premium properties...

NOTE: You will also need to do another website build and push that as well, because `sets-config.json` is needed (up to date) on the website. Alternatively, you can just copy `sets-config.json` from the public folder in the website repo and just upload that one.

### How to: Make new set
a. Open Automation/sets-config.json
    - Add a new entry like the others with the set id as the key.
b. .\parse.bat --all
c. node .\update-sets-in-firebase.mjs _setname_
d. You may want to make some keys for that set:
    - node keys.mjs --help