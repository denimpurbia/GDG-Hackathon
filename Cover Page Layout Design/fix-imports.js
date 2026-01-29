const fs = require('fs');
const path = require('path');

function fixImports(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const original = content;
        
        // Remove @version from import statements
        // Matches: from "package@1.2.3" or from '@scope/package@1.2.3'
        content = content.replace(/(from\s+['"])([^'"]+)@[\d\.]+(['"])/g, '$1$2$3');
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

function walkDirectory(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDirectory(filePath, callback);
        } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(file)) {
            callback(filePath);
        }
    });
}

const srcPath = path.join(__dirname, 'src');
let fixedCount = 0;

console.log('Starting import fix...\n');

walkDirectory(srcPath, (filePath) => {
    if (fixImports(filePath)) {
        fixedCount++;
        const relativePath = path.relative(__dirname, filePath);
        console.log(`✓ Fixed: ${relativePath}`);
    }
});

console.log(`\n✅ Total files fixed: ${fixedCount}`);
console.log('✨ Import fix completed!');
