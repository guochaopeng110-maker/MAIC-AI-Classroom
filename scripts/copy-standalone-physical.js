const fs = require('fs');
const path = require('path');

const targetPath = process.argv[2] || 'E:\\InnoSetupPackages\\OpenMaic\\standalone';
const sourcePath = path.resolve(__dirname, '../.next/standalone');

console.log(`Source Path:       ${sourcePath}`);
console.log(`Target Path:       ${targetPath}`);
console.log(`Mode:              Flat Physical Copy (Flatten node_modules to resolve dependency lookup)\n`);

if (!fs.existsSync(sourcePath)) {
  console.error("Error: Source path (.next/standalone) does not exist. Please run 'pnpm build' first.");
  process.exit(1);
}

// Ensure target path exists
fs.mkdirSync(targetPath, { recursive: true });

const items = [];
const packagesToCopy = new Map(); // pkgName -> realPath

// Helper to extract package name from symlink/path
function getPackageName(fullPath) {
  const parts = fullPath.split(path.sep);
  const nodeModulesIdx = parts.lastIndexOf('node_modules');
  if (nodeModulesIdx === -1) return null;
  
  const packageParts = parts.slice(nodeModulesIdx + 1);
  if (packageParts.length === 0) return null;
  
  if (packageParts[0].startsWith('@')) {
    return packageParts.slice(0, 2).join('/');
  } else {
    return packageParts[0];
  }
}

// Deeply scan pnpm .pnpm folder for dependency symlinks
function scanForSymlinks(dir) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    return;
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);
    let stats;
    try {
      stats = fs.lstatSync(fullPath);
    } catch (err) {
      continue;
    }

    if (stats.isSymbolicLink()) {
      try {
        const realPath = fs.realpathSync(fullPath);
        const pkgName = getPackageName(fullPath);
        if (pkgName && !packagesToCopy.has(pkgName)) {
          packagesToCopy.set(pkgName, realPath);
        }
      } catch (err) {
        // Skip unresolved symlinks
      }
    } else if (stats.isDirectory()) {
      scanForSymlinks(fullPath);
    }
  }
}

// Collect all used dependency packages (compatible with pnpm, npm, and yarn)
function collectDependencies(nodeModulesPath) {
  if (!fs.existsSync(nodeModulesPath)) return;

  const topLevelItems = fs.readdirSync(nodeModulesPath);
  for (const item of topLevelItems) {
    if (item === '.bin') continue;
    
    const fullPath = path.join(nodeModulesPath, item);
    let stats;
    try {
      stats = fs.lstatSync(fullPath);
    } catch (err) {
      continue;
    }

    if (stats.isSymbolicLink()) {
      try {
        const realPath = fs.realpathSync(fullPath);
        const pkgName = getPackageName(fullPath);
        if (pkgName && !packagesToCopy.has(pkgName)) {
          packagesToCopy.set(pkgName, realPath);
        }
      } catch (err) {}
    } else if (stats.isDirectory()) {
      if (item === '.pnpm') {
        scanForSymlinks(fullPath);
      } else if (item.startsWith('@')) {
        const scopePath = fullPath;
        const subItems = fs.readdirSync(scopePath);
        for (const subItem of subItems) {
          const subFullPath = path.join(scopePath, subItem);
          let subStats;
          try {
            subStats = fs.lstatSync(subFullPath);
          } catch (err) {
            continue;
          }
          if (subStats.isSymbolicLink()) {
            try {
              const realPath = fs.realpathSync(subFullPath);
              const pkgName = getPackageName(subFullPath);
              if (pkgName && !packagesToCopy.has(pkgName)) {
                packagesToCopy.set(pkgName, realPath);
              }
            } catch (err) {}
          } else if (subStats.isDirectory()) {
            const pkgName = `${item}/${subItem}`;
            if (!packagesToCopy.has(pkgName)) {
              packagesToCopy.set(pkgName, subFullPath);
            }
          }
        }
      } else {
        const pkgName = item;
        if (!packagesToCopy.has(pkgName)) {
          packagesToCopy.set(pkgName, fullPath);
        }
      }
    }
  }
}

// Scan non-node_modules project source files
function scanSourceFiles(src, dest) {
  let stats;
  try {
    stats = fs.lstatSync(src);
  } catch (err) {
    return;
  }

  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();

  if (isDirectory) {
    const files = fs.readdirSync(src);
    for (const file of files) {
      if (file === 'node_modules') continue;
      scanSourceFiles(path.join(src, file), path.join(dest, file));
    }
  }

  const rel = path.relative(sourcePath, src);
  if (rel && !rel.startsWith('node_modules')) {
    items.push({
      src,
      dest,
      isDirectory,
      isFile
    });
  }
}

// Recursively scan dependency packages and resolve inner links
function scanPkg(src, dest) {
  let stats;
  try {
    stats = fs.statSync(src);
  } catch (err) {
    return;
  }

  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();

  items.push({
    src,
    dest,
    isDirectory,
    isFile
  });

  if (isDirectory) {
    try {
      const children = fs.readdirSync(src);
      for (const child of children) {
        scanPkg(path.join(src, child), path.join(dest, child));
      }
    } catch (err) {}
  }
}

console.log("Analyzing project dependencies...");
collectDependencies(path.join(sourcePath, 'node_modules'));
console.log(`Found ${packagesToCopy.size} dependencies to flat-copy.`);

console.log("\nScanning files and directories...");
// Scan project source files
scanSourceFiles(sourcePath, targetPath);

// Scan gathered package directories
for (const [pkgName, realPath] of packagesToCopy.entries()) {
  const destPkgDir = path.join(targetPath, 'node_modules', pkgName.replace(/\//g, path.sep));
  scanPkg(realPath, destPkgDir);
}

console.log(`Scan complete. Found ${items.length} items to process.\n`);

let processed = 0;
let filesCopied = 0;
let directoriesCreated = 0;
const startTime = Date.now();

for (const item of items) {
  processed++;
  
  // Update progress
  if (processed % 100 === 0 || processed === items.length) {
    const percentage = Math.round((processed / items.length) * 100);
    const relDest = path.relative(targetPath, item.dest) || '.';
    const truncatedDest = relDest.length > 50 ? '...' + relDest.slice(-47) : relDest;
    process.stdout.write(`\rCopying: [${processed}/${items.length}] (${percentage}%) | ${truncatedDest.padEnd(50)}`);
  }

  let destExists = false;
  let destStats = null;
  try {
    destStats = fs.lstatSync(item.dest);
    destExists = true;
  } catch (e) {}

  if (item.isDirectory) {
    if (!destExists) {
      try {
        fs.mkdirSync(item.dest, { recursive: true });
        directoriesCreated++;
      } catch (err) {
        console.error(`\nError creating directory ${item.dest}:`, err.message);
      }
    } else if (destStats.isSymbolicLink() || destStats.isFile()) {
      try {
        fs.rmSync(item.dest, { recursive: true, force: true });
        fs.mkdirSync(item.dest, { recursive: true });
        directoriesCreated++;
      } catch (err) {
        console.error(`\nError replacing file/symlink with directory ${item.dest}:`, err.message);
      }
    }
  } else if (item.isFile) {
    try {
      if (destExists && (destStats.isSymbolicLink() || destStats.isDirectory())) {
        fs.rmSync(item.dest, { recursive: true, force: true });
      }
      
      const parentDir = path.dirname(item.dest);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      fs.copyFileSync(item.src, item.dest);
      filesCopied++;
    } catch (err) {
      console.error(`\nError copying file ${item.src} to ${item.dest}:`, err.message);
    }
  }
}

const duration = ((Date.now() - startTime) / 1000).toFixed(2);

console.log(`\n\nFlat physical copy completed successfully in ${duration}s!`);
console.log(`- Created physical directories:  ${directoriesCreated}`);
console.log(`- Copied physical files:         ${filesCopied}`);
console.log(`- Total items processed:         ${processed}`);
