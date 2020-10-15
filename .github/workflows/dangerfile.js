import {message, danger} from "danger"

const pr = danger.github.pr
message("Change PR title. Title: " + pr.title)

const modified = danger.git.modified_files.join("\n")
message("Changed Files in this PR: \n - " + modified)
