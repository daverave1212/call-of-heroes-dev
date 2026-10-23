
from pathlib import Path
from PIL import Image
import math

# Configuration
IMAGES_PER_ROW = 9
PADDING = 10
OUTPUT_NAME = "spritesheet.png"
BACKGROUND = (0, 0, 0, 0)  # Transparent

# Folder containing this script
folder = Path(__file__).resolve().parent

# Get all PNG files, alphabetically
files = sorted(
    (
        p for p in folder.iterdir()
        if p.suffix.lower() == ".png"
        and p.name.lower() != OUTPUT_NAME.lower()
    ),
    key=lambda p: p.name.lower()
)

if not files:
    raise RuntimeError("No PNG files found!")

# Load images
images = []
for file in files:
    with Image.open(file) as img:
        images.append(img.convert("RGBA"))

# Determine cell dimensions
cell_width = max(img.width for img in images)
cell_height = max(img.height for img in images)

# Calculate sheet dimensions
columns = min(IMAGES_PER_ROW, len(images))
rows = math.ceil(len(images) / IMAGES_PER_ROW)

sheet_width = columns * cell_width + (columns - 1) * PADDING
sheet_height = rows * cell_height + (rows - 1) * PADDING

# Create sprite sheet
sheet = Image.new(
    "RGBA",
    (sheet_width, sheet_height),
    BACKGROUND
)

# Place images
for i, (file, img) in enumerate(zip(files, images)):
    col = i % IMAGES_PER_ROW
    row = i // IMAGES_PER_ROW

    x = col * (cell_width + PADDING)
    y = row * (cell_height + PADDING)

    # Center image inside its cell
    x += (cell_width - img.width) // 2
    y += (cell_height - img.height) // 2

    sheet.paste(img, (x, y), img)

    print(f"{i + 1}. {file.name} -> ({x}, {y})")

# Save
output_path = folder / OUTPUT_NAME
sheet.save(output_path)

print(f"\nSaved: {output_path}")
print(f"Dimensions: {sheet_width} x {sheet_height}")
print(f"Images: {len(images)}")
