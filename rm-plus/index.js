#!/usr/bin/env node

const exec = require("child_process").exec;

const rimraf = require("rimraf/rimraf");

const path = require("path");

/**
 * clear recycler
 */
const clearRecycler = () => {
  try {
    exec("Clear-RecycleBin -Force", { shell: "powershell.exe" });
  } catch (_error) {}
};

/**
 * remove node_modules
 */
const removeNodeModules = () => {
  try {
    rimraf("node_modules", {}, (e) => {
      if(e){
        console.log('remove node_modules fail : ', e)
      }
    });
  } catch (_error) {}
}

const isRoot = (arg) => /^(\/|[a-zA-Z]:\\)$/.test(path.resolve(arg));
const filterOutRoot = (arg) => {
  const ok = preserveRoot === false || !isRoot(arg);
  if (!ok) {
    console.error(`refusing to remove ${arg}`);
    console.error("Set --no-preserve-root to allow this");
  }
  return ok;
};

let help = false;
let dashdash = false;
let noglob = false;
let preserveRoot = true;
const args = process.argv
  .slice(2)
  .filter((arg) => {
    if (dashdash) return !!arg;
    else if (arg === "--") dashdash = true;
    else if (arg === "--no-glob" || arg === "-G") noglob = true;
    else if (arg === "--glob" || arg === "-g") noglob = false;
    else if (arg.match(/^(-+|\/)(h(elp)?|\?)$/)) help = true;
    else if (arg === "--preserve-root") preserveRoot = true;
    else if (arg === "--no-preserve-root") preserveRoot = false;
    else return !!arg;
  })
  .filter((arg) => !preserveRoot || filterOutRoot(arg));

const go = (n) => {
  if (n >= args.length) return;
  const options = noglob ? { glob: false } : {};

  if (args[0] === "--clear" || args[0] === "-c") {
    clearRecycler();
    return;
  }

  if (args[0] === "--node_modules" || args[0] === "-n") {
    removeNodeModules();
    return;
  }

  // @ts-ignore
  rimraf(args[n], options, (er) => {
    if (er) throw er;
    go(n + 1);
  });
};

if (help || args.length === 0) {
  // If they didn't ask for help, then this is not a "success"
  const log = help ? console.log : console.error;
  log("Usage: rmp <path> [<path> ...]");
  log("");
  log('  Deletes all files and folders at "path" recursively.');
  log("");
  log("Options:");
  log("");
  log("  -h, --help          Display this usage info");
  log("  -G, --no-glob       Do not expand glob patterns in arguments");
  log("  -g, --glob          Expand glob patterns in arguments (default)");
  log("  --preserve-root     Do not remove '/' (default)");
  log("  --no-preserve-root  Do not treat '/' specially");
  log("  -c, --clear         Clear RecycleBin");
  log("  -n, --node_modules  Remove node_modules");
  log("  --                  Stop parsing flags");
  process.exit(help ? 0 : 1);
} else {
  go(0);
}
