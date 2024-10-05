const fs = require('fs');

// Define the source and destination file paths
const sourceFile = '.env.local';
const destFile = '.env';

try {
    // Copy the file from source to destination
    fs.copyFileSync(sourceFile, destFile);
    console.log(`${sourceFile} was copied to ${destFile}`);
} catch (error) {
    console.error('Error copying file:', error);
}
