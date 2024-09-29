from PIL import Image
import os
from os import listdir
from os.path import join, isfile
import pathlib

files = [f for f in listdir('.') if isfile(join('.', f)) and f.endswith('.png')]

for file_name in files:
    image = Image.open(file_name)
    width, height = image.size
    if width <= 196 or height <= 196:
        continue
    new_image = image.resize((196, 196))
    dot_index = file_name.index('.')
    new_image_name = file_name[0:dot_index] + '.png'
    new_image.save(new_image_name)
    # os.remove(file_name)