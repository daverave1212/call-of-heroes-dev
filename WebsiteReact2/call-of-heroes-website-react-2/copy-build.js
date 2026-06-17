const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'build'); 
const destination = path.join(__dirname, '../../../callofheroesrpg.github.io'); // Change this to your target path

try {
  // recursive: true copies subfolders, force: true overwrites existing files
  fs.cpSync(source, destination, { recursive: true, force: true });
  console.log('🎉 Build contents successfully copied to destination!');
} catch (err) {
  console.error('❌ Error copying build folder:', err);
}