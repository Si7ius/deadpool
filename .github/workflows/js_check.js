import {message, danger} from "danger"

const modified = danger.git.modified_files.join("\n")
message("Changed Files in this PR: \n - " + modified)
