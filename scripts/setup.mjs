// One command to get the site running: npm run setup
//   npm run setup               install → (optional) email setup → start dev server
//   npm run setup -- --prod     install → email check → production build → start
//   npm run setup -- --clean    also clears the .next cache first (fixes "blank/unstyled page" issues)
//   npm run setup -- --skip-email
// Uses only Node built-ins so it works before dependencies are installed.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import readline from "node:readline";

const args = new Set(process.argv.slice(2));
const prod = args.has("--prod");
const root = process.cwd();
const envFile = join(root, ".env.local");

const step = (n, msg) => console.log(`\n\x1b[33m[${n}]\x1b[0m ${msg}`);
const fail = (msg) => {
  console.error(`\n\x1b[31m✖ ${msg}\x1b[0m\n`);
  process.exit(1);
};
const run = (cmd, cmdArgs) => spawnSync(cmd, cmdArgs, { stdio: "inherit", shell: process.platform === "win32" }).status === 0;
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

async function confirm(question) {
  if (!process.stdin.isTTY) return false;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question(`${question} (Y/n) `, resolve));
  rl.close();
  return !/^n/i.test(answer.trim());
}

console.log("\n\x1b[1mBeeNest website setup\x1b[0m");

// 1. Node version (Next.js 15 needs 18.18+)
step(1, "Checking Node.js version…");
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 18 || (major === 18 && minor < 18)) fail(`Node.js ${process.versions.node} is too old. Install Node 20 LTS or newer.`);
console.log(`Node.js ${process.versions.node} ✔`);

// 2. Dependencies
step(2, "Installing packages…");
if (!run(npm, ["install", "--no-audit", "--no-fund"])) fail("npm install failed — see the error above.");

// 3. Contact form email
step(3, "Contact form email…");
const emailReady = existsSync(envFile) && /^SMTP_PASS=.+/m.test(readFileSync(envFile, "utf8"));
if (emailReady) {
  console.log("Already configured in .env.local ✔");
} else if (args.has("--skip-email")) {
  console.log("Skipped. Form submissions will only be printed in the terminal.");
} else if (await confirm("Email isn't set up yet. Set it up now? You'll need a Gmail App Password.")) {
  if (!run(process.execPath, [join(root, "scripts/setup-email.mjs")])) {
    console.log("Email setup didn't finish — continuing. Run `npm run setup:email` later.");
  }
} else {
  console.log("Skipped. Run `npm run setup:email` any time. Until then, leads are printed in the terminal.");
  if (prod) console.log("\x1b[31mWarning:\x1b[0m in production the form will show an error until email is configured.");
}

// 4. Optional cache clean
if (args.has("--clean")) {
  step(4, "Clearing the .next cache…");
  rmSync(join(root, ".next"), { recursive: true, force: true });
  console.log("Cleared ✔ (stop any other running `npm run dev` first, or it will break)");
}

// 5. Start
if (prod) {
  step(5, "Building for production…");
  if (!run(npm, ["run", "build"])) fail("Build failed — see the error above.");
  step(6, "Starting production server on http://localhost:3000 (Ctrl+C to stop)");
  run(npm, ["run", "start"]);
} else {
  step(5, "Starting dev server — open the URL shown below (Ctrl+C to stop)");
  run(npm, ["run", "dev"]);
}
