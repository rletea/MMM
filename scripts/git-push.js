const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  const dir = path.resolve(__dirname, "..");
  console.log("Git operations in directory:", dir);

  // Initialize git repo if not already
  try {
    await git.init({ fs, dir });
  } catch (err) {
    // Ignore if exists
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
  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }

  try {
    const sha = await git.commit({
      fs,
      dir,
      message: "Initial release: My Marketing Manager (MMM) Platform",
      author: {
        name: "rletea",
        email: "rletea@users.noreply.github.com",
      },
    });
    console.log("Committed:", sha);
  } catch (err) {
    // Already committed
  }

  const remoteUrl = "https://github.com/rletea/MMM.git";
  try {
    await git.addRemote({ fs, dir, remote: "origin", url: remoteUrl });
  } catch (err) {
    // Remote already exists
  }

  try {
    await git.branch({ fs, dir, ref: "main", checkout: true });
  } catch (err) {
    // Branch exists
  }

  let token = process.argv[2] || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    token = await askQuestion(
      "\nEnter your GitHub Personal Access Token (or paste token): "
    );
  }

  // Strip any accidental brackets or quotes
  if (token) {
    token = token.replace(/^[<"']|[>"']$/g, "").trim();
  }

  console.log("\nPushing to", remoteUrl, "on branch main...");
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
    console.log("\n🚀 PUSH SUCCESSFUL! Your code is live on GitHub:", remoteUrl);
  } catch (pushErr) {
    console.error("\nPush error:", pushErr.message);
    if (pushErr.message.includes("401") || pushErr.message.includes("Unauthorized")) {
      console.log(
        "\nAuthentication failed. Ensure your GitHub Personal Access Token has 'repo' permissions."
      );
    }
  }
}

main().catch((err) => {
  console.error("Error running git script:", err);
});
