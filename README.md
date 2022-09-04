# call-of-heroes-dev

## 1. How to check file structure:
    
    $ cd Dev
    $ node FileChecker.mjs

## 2. How to compile website:

    ($ cd Dev)
    $ node index.mjs

## 3. Host the website for testing:

    ($ cd ..)
    $ node run-server.mjs



## How to add a new file:

- In Config.files, add the input file path and its type
- In Mappings, create a mapping for that type (or for elements in its content)
- In FileChecker, add a case for 'checkFile'. Follow the other examples there
- Create a new script, "Generate<Thing>.mjs" which exports default the function which generates the static page
- In index.mjs add a case to the switch and follow the examples
