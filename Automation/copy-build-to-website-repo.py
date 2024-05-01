from os import path
import os
import shutil


WEBSITE_REPO_PATH = path.join('..', '..', '..', 'callofheroesrpg.github.io', 'callofheroesrpg.github.io')
BUILD_PATH = path.join('..', 'WebsiteReact2', 'call-of-heroes-website-react-2', 'build')


for item in os.listdir(BUILD_PATH):
    source = path.join(BUILD_PATH, item)
    destination = path.join(WEBSITE_REPO_PATH, item)

    if os.path.isdir(source):
        shutil.copytree(source, destination, dirs_exist_ok=True)
    else:
        shutil.copy2(source, destination)
