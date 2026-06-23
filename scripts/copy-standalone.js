const fs = require('fs');
const path = require('path');

const targetPath = process.argv[2] || 'E:\\InnoSetupPackages\\OpenMaic\\standalone';
const sourcePath = path.resolve(__dirname, '../.next/standalone');
const workspaceNodeModules = path.resolve(__dirname, '../node_modules');

console.log(`Source Path:       ${sourcePath}`);
console.log(`Target Path:       ${targetPath}`);
console.log(`Workspace Modules: ${workspaceNodeModules}\n`);

if (!fs.existsSync(sourcePath)) {
  console.error("Error: Source path (.next/standalone) does not exist. Please run 'pnpm build' first.");
  process.exit(1);
}

// Ensure target path exists
fs.mkdirSync(targetPath, { recursive: true });

const items = [];

// Recursively scan the source directory without following symlinks
function scan(src, dest) {
  let stats;
  try {
    stats = fs.lstatSync(src);
  } catch (err) {
    return;
  }
  
  const isSymlink = stats.isSymbolicLink();
  
  items.push({
    src,
    dest,
    isSymlink,
    isDirectory: !isSymlink && stats.isDirectory(),
    isFile: !isSymlink && stats.isFile()
  });

  // Do not recurse into symbolic links to avoid infinite loops and duplicate scans
  if (!isSymlink && stats.isDirectory()) {
    try {
      const children = fs.readdirSync(src);
      for (const child of children) {
        scan(path.join(src, child), path.join(dest, child));
      }
    } catch (err) {
      console.warn(`Warning: Could not read directory ${src}: ${err.message}`);
    }
  }
}

console.log("Scanning source files...");
scan(sourcePath, targetPath);
console.log(`Scan complete. Found ${items.length} items to process.\n`);

let processed = 0;
let symlinksCreated = 0;
let filesCopied = 0;
let directoriesCreated = 0;

for (const item of items) {
  processed++;
  
  // Print progress indicator
  if (processed % 50 === 0 || processed === items.length) {
    const percentage = Math.round((processed / items.length) * 100);
    process.stdout.write(`\rProcessing: [${processed}/${items.length}] (${percentage}%) `);
  }

  // Check if destination exists
  let destExists = false;
  let destStats = null;
  try {
    destStats = fs.lstatSync(item.dest);
    destExists = true;
  } catch (e) {}

  if (item.isSymlink) {
    try {
      // Read original link target
      const rawTarget = fs.readlinkSync(item.src);
      const absoluteTarget = path.resolve(path.dirname(item.src), rawTarget);
      
      let finalTarget = absoluteTarget;
      
      // If target points inside the workspace's node_modules, map it to the destination's node_modules
      const rel = path.relative(workspaceNodeModules, absoluteTarget);
      if (!rel.startsWith('..') && !path.isAbsolute(rel)) {
        const destNodeModules = path.join(targetPath, 'node_modules');
        finalTarget = path.join(destNodeModules, rel);
      }
      
      // Clean up destination if it exists
      if (destExists) {
        if (destStats.isSymbolicLink() || destStats.isFile()) {
          fs.unlinkSync(item.dest);
        } else if (destStats.isDirectory()) {
          fs.rmSync(item.dest, { recursive: true, force: true });
        }
      }
      
      // Ensure parent directory exists
      const parentDir = path.dirname(item.dest);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      // Create junction on Windows, symlink on other platforms
      const type = process.platform === 'win32' ? 'junction' : 'dir';
      fs.symlinkSync(finalTarget, item.dest, type);
      symlinksCreated++;
    } catch (err) {
      console.error(`\nError processing symlink ${item.src}:`, err.message);
    }
  } else if (item.isDirectory) {
    if (!destExists) {
      try {
        fs.mkdirSync(item.dest, { recursive: true });
        directoriesCreated++;
      } catch (err) {
        console.error(`\nError creating directory ${item.dest}:`, err.message);
      }
    }
  } else if (item.isFile) {
    try {
      // Clean up destination if it exists as directory/symlink
      if (destExists && (destStats.isSymbolicLink() || destStats.isDirectory())) {
        fs.rmSync(item.dest, { recursive: true, force: true });
      }
      
      // Ensure parent directory exists
      const parentDir = path.dirname(item.dest);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      fs.copyFileSync(item.src, item.dest);
      filesCopied++;
    } catch (err) {
      console.error(`\nError copying file ${item.src}:`, err.message);
    }
  }
}

console.log(`\n\nCopy completed successfully!`);
console.log(`- Created directories:        ${directoriesCreated}`);
console.log(`- Copied files:               ${filesCopied}`);
console.log(`- Recreated directory links:  ${symlinksCreated}`);
