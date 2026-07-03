/**
 * Generates the static offline flight pack artifact the PWA installs from.
 * Run from apps/web: `pnpm generate:offline-pack` (see flight-pack-policy.md
 * for what may enter the pack — the builder self-audits and fails closed).
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { buildOfflineFlightPack } from "../src/lib/offline-pack/build-pack";
import { OFFLINE_PACK_ARTIFACT_URL } from "../src/lib/offline-pack/schema";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(webRoot, "public", OFFLINE_PACK_ARTIFACT_URL);

function sourceCommit(): string | undefined {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: webRoot }).toString().trim();
  } catch {
    return undefined;
  }
}

const pack = buildOfflineFlightPack({ sourceCommit: sourceCommit() });

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(pack, null, 2)}\n`);

console.log(
  `offline pack written: ${outFile}\n` +
    `  packVersion ${pack.manifest.packVersion} · generated ${pack.manifest.generatedAt}\n` +
    `  ${pack.searchDocuments.length} search documents · ${pack.briefing.length} briefing sections · ${pack.readiness.length} readiness items`
);
