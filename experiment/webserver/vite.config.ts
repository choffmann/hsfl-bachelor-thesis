import { ConfigEnv, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {execSync} from 'child_process'

export default ({mode}: ConfigEnv) => {
  if (mode !== "release") {
        const appUrl = "https://wasm.choffmann.io"
        const author = "Cedrik Hoffmann"
        const gitLatestTag = execSync("git describe --tags --abbrev=0").toString().trimEnd()
        const gitCurrentBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd()
        const gitLastCommit = execSync("git rev-parse --short HEAD").toString().trimEnd()
        const gitBuildDateTime = execSync("git log -1 --format=%cd --date=format:\"%d.%m.%y - %H:%M\"").toString().trimEnd()

        process.env.VITE_APP_URL = appUrl
        process.env.VITE_AUTHOR = author
        process.env.VITE_APP_VERSION = gitLatestTag
        process.env.VITE_CURRENT_BRANCH = gitCurrentBranch
        process.env.VITE_LAST_COMMIT = gitLastCommit
        process.env.VITE_APP_BUILD_DATETIME = gitBuildDateTime
    }

  return defineConfig({
    plugins: [react()],
  });
};
