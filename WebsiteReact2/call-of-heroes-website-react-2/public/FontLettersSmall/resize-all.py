import os
from PIL import Image

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Process all PNG files in the directory
for filename in os.listdir(script_dir):
    if filename.lower().endswith(".png"):
        img_path = os.path.join(script_dir, filename)
        
        with Image.open(img_path) as img:
            # Calculate new size
            new_size = (int(img.width * 0.33), int(img.height * 0.33))
            resized_img = img.resize(new_size, Image.LANCZOS)
            
            # Save the resized image with a new name
            new_filename = f"resized_{filename}"
            resized_img.save(os.path.join(script_dir, new_filename), "PNG")

print("Resizing complete.")