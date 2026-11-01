// Interactive setup for the contact-form email: writes SMTP settings to .env.local,
// verifies the login, and sends a test email. Run with: npm run setup:email
import { chmodSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import readline from "node:readline";
import nodemailer from "nodemailer";

const ENV_PATH = join(process.cwd(), ".env.local");
const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT || 465);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: process.stdin.isTTY });
// Echo typed characters as * while a secret is being entered.
let muted = false;
rl._writeToOutput = (s) => {
  if (!muted) rl.output.write(s);
  else if (s.includes("\n")) rl.output.write("\n");
  else rl.output.write("*".repeat(s.length));
};
// Queue lines so answers piped in all at once aren't dropped.
const queued = [];
const waiting = [];
rl.on("line", (line) => (waiting.length ? waiting.shift()(line) : queued.push(line)));
rl.on("close", () => waiting.splice(0).forEach((resolve) => resolve("")));
const ask = (q, { secret = false } = {}) =>
  new Promise((resolve) => {
    process.stdout.write(q);
    muted = secret;
    const done = (a) => {
      muted = false;
      if (secret && !process.stdin.isTTY) process.stdout.write("\n");
      resolve(a.trim());
    };
    queued.length ? done(queued.shift()) : waiting.push(done);
  });

console.log("\nBeeNest contact form — email setup\n");
console.log("You need a Gmail App Password (not your normal password):");
console.log("  Google Account → Security → 2-Step Verification → App passwords → create 'BeeNest website'\n");

const user = await ask("Gmail address that sends the emails: ");
const pass = (await ask("16-character App Password (hidden): ", { secret: true })).replace(/\s+/g, "");
const leadsTo = (await ask(`Inbox that receives leads [${user}]: `)) || user;
rl.close();

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadsTo)) {
  console.error("\n✖ That doesn't look like a valid email address. Nothing was saved.");
  process.exit(1);
}
if (pass.length < 8) {
  console.error("\n✖ App Password looks too short. Nothing was saved.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });

process.stdout.write("\nChecking login with Gmail… ");
try {
  await transporter.verify();
  console.log("✔");
} catch (err) {
  console.log("✖");
  console.error(`\n${err.message}\n`);
  console.error("Check the address and App Password (and that 2-Step Verification is on). Nothing was saved.");
  process.exit(1);
}

// Merge into .env.local, keeping any unrelated settings already there.
const values = { SMTP_HOST: host, SMTP_PORT: String(port), SMTP_USER: user, SMTP_PASS: pass, LEADS_TO: leadsTo };
const lines = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf8").split("\n") : [];
const kept = lines.filter((l) => !Object.keys(values).some((k) => l.startsWith(`${k}=`)));
while (kept.length && !kept[kept.length - 1].trim()) kept.pop();
const block = ["# Contact form email (written by npm run setup:email)", ...Object.entries(values).map(([k, v]) => `${k}=${v}`)];
writeFileSync(ENV_PATH, [...kept, ...(kept.length ? [""] : []), ...block, ""].join("\n"), { mode: 0o600 });
chmodSync(ENV_PATH, 0o600); // owner-only: the file holds a password
console.log(`Saved settings to .env.local ✔`);

process.stdout.write(`Sending a test email to ${leadsTo}… `);
try {
  await transporter.sendMail({
    from: `"BeeNest Website" <${user}>`,
    to: leadsTo,
    subject: "BeeNest website: contact form email is working",
    text: "This is a test from npm run setup:email. New enquiries from the website contact form will arrive like this.",
  });
  console.log("✔");
} catch (err) {
  console.log("✖");
  console.error(`\n${err.message}`);
  process.exit(1);
}

console.log("\nDone! Restart `npm run dev` so the site picks up the new settings.");
console.log("If the test email is in Spam, mark it 'Not spam' once.\n");
