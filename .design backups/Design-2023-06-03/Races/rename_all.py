
import os

files = [file for file in os.listdir('.') if os.path.isfile(os.path.join('.', file)) and file.endswith('.txt')]

for file in files:
    os.rename(file, file.split('.')[0] + '.yml')