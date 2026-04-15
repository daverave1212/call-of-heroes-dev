@echo off

echo Copying parse-text-symbols-static.json...
copy /Y "..\WebsiteReact2\call-of-heroes-website-react-2\src\parse-text-symbols-static.json" "%~dp0"

echo Copying stats-constants.js...
copy /Y "..\WebsiteReact2\call-of-heroes-website-react-2\src\services\game-lib\stats-constants.js" "%~dp0"

echo Renaming stats-constants.js to stats-constants.mjs...
if exist "%~dp0stats-constants.mjs" del /F /Q "%~dp0stats-constants.mjs"
rename "%~dp0stats-constants.js" "stats-constants.mjs"

echo Running script...
node generate-jsons-from-yaml.mjs

echo.
echo Done.