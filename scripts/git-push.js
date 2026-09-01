const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
const path = require("path");

async function main() {
  const dir = path.resolve(__dirname, "..");
  console.log("Git operations in directory:", dir);

  // Initialize git repo if not already
  try {
    await git.init({ fs, dir });
    console.log("Initialized git repository.");
  } catch (err) {
    console.log("Git repo already exists or init note:", err.message);
  }

  // Scan all files in workspace respecting .gitignore
  const files = [];
  function scan(currentDir, relativePath = "") {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const rel = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      if (
        entry.name === ".git" ||
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "dev.db" ||
        entry.name === "dev.db-journal" ||
        entry.name === ".env.local"
      ) {
        continue;
      }
      if (entry.isDirectory()) {
        scan(path.join(currentDir, entry.name), rel);
      } else {
        files.push(rel);
      }
    }
  }

  scan(dir);
  console.log(`Found ${files.length} project files to stage.`);

  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }
  console.log("Staged all files.");

  const sha = await git.commit({
    fs,
    dir,
    message: "Initial release: My Marketing Manager (MMM) Platform",
    author: {
      name: "rletea",
      email: "rletea@users.noreply.github.com",
    },
  });
  console.log("Committed with SHA:", sha);

  // Set remote
  const remoteUrl = "https://github.com/rletea/MMM.git";
  try {
    await git.addRemote({ fs, dir, remote: "origin", url: remoteUrl });
    console.log("Added remote origin:", remoteUrl);
  } catch (err) {
    console.log("Remote origin note:", err.message);
  }

  console.log("Branch:", "main");
  try {
    await git.branch({ fs, dir, ref: "main", checkout: true });
  } catch (err) {
    console.log("Branch set note:", err.message);
  }

  console.log("\nReady to push. Attempting push to", remoteUrl);
  const cliToken = process.argv[2];
  const token = cliToken || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: "origin",
      ref: "main",
      onAuth: () => {
        if (token) {
          return { username: token, password: "" };
        }
        return {};
      },
    });
    console.log("Push result: SUCCESS!", pushResult);
  } catch (pushErr) {
    console.log("Push notice:", pushErr.message);
    if (pushErr.message.includes("401") || pushErr.message.includes("Unauthorized") || pushErr.message.includes("auth")) {
      console.log("\nAuthentication required: You can push by running:\n  node scripts/git-push.js <YOUR_GITHUB_TOKEN>\nor by using standard git:\n  git push -u origin main");
    }
  }
}

main().catch((err) => {
  console.error("Error running git script:", err);
});
