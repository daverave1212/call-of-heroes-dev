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

### Premium vs default vs other
When doing `generate-jsons-from-yaml`, it reads all files in `sets-config.json` from all sets and does the following to each:
    a. Reads it
    b. Validates it
    c. Normalizes it -- adds HasMixins, Origin, ParentKey, replaces Inherit, etc
    d. Preprocesses it -- formats data, records Abilities, etc
    e. Outputs it

Outputting works as follows, depending on the file type.
    a. Default
        - Outputs the file as is to its corresponding file path (Other/Monsters.yml -> repo/Other/Monsters.json)
    b. Premium (e.g. file is from a non-Basic Set):
        - Outputs the file ONLY to GeneratedPremiumFiles for cloud (Other/Monsters.yml -> ./GeneratedPremiumFiles/Other/Monsters.json)
        - Strips the file and leaves only what should be visible to FTP
        - Outputs it normally
    c. Composite (files only present in the basic set, but with content from various sets)
        - NOTE: A composite YML file sits only once in the standard work dir
        - Splits it into different objects for each set, and strips the main file
        - Outputs the semi-stripped file normally
        - For each set, outputs its new file to ./GeneratedPremiumFles/<SetName>/...
For a **Composite File** you need to create a custom output strategy in *OUTPUT_STRATEGIES* in `generate-jsons-from-yaml.mjs`
    

### How to: Add new "package" (e.g. Races, Classes, etc)
A package represents a folder for categorizing file types.
For example, Races/... -> Races is a package; Other/... -> Other is a package. Etc.
To add a new type of package to the cloud in Firebase, you must follow some steps.

a. Prerequisites:
    - the new package must be a folder with one or more design files inside.
    - Add it to the *packages* list of any set from `Automation/sets-config.json`
    - If the file is normal, make sure there are files of that package in the list. If it's a *composite file* (with features from multiple sets), make sure that file is ONLY in the base design folder and NOT part of the files of other sets. Still the config of that set should include it in its packages. You can add it to `ghostFiles` of the config of the set if you like; these are ignored

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
f. Run `node .\update-sets-in-firebase.mjg <PackageName>`

You may also want to create a base version of that file without the premium properties...

NOTE: You will also need to do another website build and push that as well, because `sets-config.json` is needed (up to date) on the website. Alternatively, you can just copy `sets-config.json` from the public folder in the website repo and just upload that one.

### How to: Make new set
a. Open Automation/sets-config.json
    - Add a new entry like the others with the set id as the key.
b. .\parse.bat --all
c. node .\update-sets-in-firebase.mjs _setname_
d. You may want to make some keys for that set:
    - node keys.mjs --help