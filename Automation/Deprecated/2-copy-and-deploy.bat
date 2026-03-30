for /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
     set dow=%%i
     set month=%%j
     set day=%%k
     set year=%%l
)
set datestr=%month%_%day%_%year%

echo 3a. Copying files over
python copy-build-to-website-repo.py

echo 3b. Saving repo to git
cd ..
git add .
git commit -m "Update %datestr%"
git push




echo 4. CD-ing to GitHub Pages
cd ..
cd ..
cd callofheroesrpg.github.io
cd callofheroesrpg.github.io

echo 5. Running git commands
git add .
git commit -m %datestr%
git push

echo Done!