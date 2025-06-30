const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWKoVvnJ60-NL83dIW6sdedJouZkpDudfSc0Oq79LHjA_WJXDNFjLakmxSCT1culJ7qIjDeEuESjec/pub?output=csv";

function toSafeKey(original) {
  // Removes special characters, spaces, and PascalCases the key
  return original
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

async function fetchAndSaveTranslations() {
  const response = await fetch(CSV_URL);
  const csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const records = parsed.data;

  const en = {};
  const gu = {};
  const hi = {};
  const keys = {};

  records.forEach((row) => {
    const key = row["Key"];
    if (!key) return;

    const safeKey = toSafeKey(key);

    en[key] = row["English"] || key;
    gu[key] = row["Gujarati"] || key;
    hi[key] = row["Hindi"] || key;

    keys[safeKey] = key;
  });

  const localesDir = path.join(__dirname, "locales");
  fs.writeFileSync(path.join(localesDir, "lnEn.json"), JSON.stringify(en, null, 2));
  fs.writeFileSync(path.join(localesDir, "lnGu.json"), JSON.stringify(gu, null, 2));
  fs.writeFileSync(path.join(localesDir, "lnHi.json"), JSON.stringify(hi, null, 2));

  // Generate translationKeys.ts
  const keyEntries = Object.entries(keys)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join("\n");

  const keyFileContent = `const translationKeys = {\n${keyEntries}\n};\n\nexport default translationKeys;\n`;

  fs.writeFileSync(path.join(__dirname, "translationKeys.ts"), keyFileContent);

  console.log("✅ JSONs & translationKeys.ts generated successfully.");
}

fetchAndSaveTranslations().catch((err) => {
  console.error("❌ Failed to fetch translations:", err);
});
