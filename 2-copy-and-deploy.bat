echo 3a. Saving repo to git
git add .
git commit -m %1
git push


echo 3. Copying files over
python copy-build-to-website-repo.py

echo 4. CD-ing to GitHub Pages
cd ..
cd callofheroesrpg.github.io
cd callofheroesrpg.github.io

echo 5. Running git commands
git add .
git commit -m %1
git push

echo Done!