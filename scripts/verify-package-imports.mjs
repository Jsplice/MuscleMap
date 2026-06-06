import process from "node:process";
import { URL } from "node:url";

const packages = ["core", "assets", "react"];

for (const packageName of packages) {
  await import(new URL(`../packages/${packageName}/dist/index.js`, import.meta.url));
}

process.stdout.write("Native Node ESM imports succeeded for all public packages.\n");
