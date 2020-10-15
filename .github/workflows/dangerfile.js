import {message, danger, warn, fail} from "danger";

const modified = danger.git.modified_files.join("\n");
message("Changed Files in this PR: \n - " + modified);

danger.git.commits.forEach(commit => {
  if (commit.message.length < 5) {
    warn("Commit name ('${commit.message}') is very short. Name it with definition");
  }
  if (commit.message.match(/^(fix)|(mod)/g)) {
    fail(`Don't use fix or mod on commit messages. Commit: '${commit.message}'`);
  }
});