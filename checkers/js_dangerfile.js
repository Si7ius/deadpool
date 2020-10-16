import {message, danger, warn, fail} from "danger";

const modified = danger.git.modified_files.join("\n");
message("Changed Files in this PR: \n - " + modified);

danger.git.commits.forEach(commit => {
  if (commit.message.length < 5) {
    warn(`Commit name ('${commit.message}') is very short. Name it with definition`);
  }
  if (commit.message.match(/^(fix)|(mod)/g)) {
    fail(`Don't use fix or mod on commit messages. Commit: '${commit.message}'`);
  }
});

// Check for console.log
const PATTERN = /console\.(log|error|warn|info)/g
const JS_FILE = /\.(js|html)?$/

const diffs = danger.git.created_files
  .concat(danger.git.modified_files)
  .filter(file => JS_FILE.test(file))
  .map(file => {
    return danger.git.diffForFile(file).then(diff => ({
      file,
      diff,
    }))
  });

const additions = await Promise.all(diffs)

additions
  .filter(({ diff }) => !!diff)
  .forEach(({ file, diff }) => {
    const matches = findConsole(diff.added)
    if (matches.length > 0) callback(file, matches)
  });

function findConsole(content) {
  let matches = content.match(PATTERN)
  return matches || []
}

function defaultCallback(file, matches) {
  fail(`remove console in ${file}.`)
}
