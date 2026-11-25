// Worst Fix Ever: Funniest Commit Message — entry program (v2).
//
// Writes a single commit message to /output/entry.txt: one line,
// 1-100 characters, a fix that made everything worse.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. The fix: delete the login page so nobody can fail to log in
// anymore. The backfire: the metric looks perfect — zero failed logins
// reported since — because nobody can log in at all.
const ENTRY_LINE: string =
  "fix: prevent login failures by removing the login page; zero failed logins reported since";

const MIN_CHARS = 1;
const MAX_CHARS = 100;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-100 characters, or
  // anything that is only whitespace or spans more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
