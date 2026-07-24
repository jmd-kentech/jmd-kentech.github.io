const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "../..");
const fixtureDir = path.join(repoRoot, "test/fixtures/integration-distill");

const files = [
  { from: path.join(fixtureDir, "2018-12-22-distill.md"), to: path.join(repoRoot, "_posts/2018-12-22-distill.md") },
  { from: path.join(fixtureDir, "2018-12-22-distill.bib"), to: path.join(repoRoot, "assets/bibliography/2018-12-22-distill.bib") },
];

function stage() {
  for (const { from, to } of files) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
}

function unstage() {
  for (const { to } of files) {
    fs.rmSync(to, { force: true });
  }
}

if (require.main === module) {
  stage();
}

module.exports = { stage, unstage, files };
