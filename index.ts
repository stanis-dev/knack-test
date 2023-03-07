import { readFileSync, writeFileSync } from "fs";
import { sanitizeApp } from "./src/sanitizeApp";

/*
  Further improvements:
  - merge duplicate objects instead of removing second occurrence
  - stream read/write JSON files
  - allow for deeper object children deduping, also by key arr
 */

const main = () => {
  try {
    const data = readFileSync("./mock_application.json", "utf8");
    const app = JSON.parse(data);

    const cleanApp = sanitizeApp(app);
    writeFileSync("clean_application.json", JSON.stringify(cleanApp));
  } catch (err) {
    console.error(err);
  }
};

main();
