import path from "node:path";
import fs from "node:fs";
import { __dirname } from "../__dirname.js";

export function log_error(error: any): void {
  const logs_path = path.join(__dirname, "logs");
  const date = new Date();

  if (
    !fs.readdirSync(logs_path).filter(() => {
      return "logs";
    })
  ) {
    fs.mkdirSync(logs_path)
  }

  const file_name = date.toString();
  const file_path = path.join(logs_path, file_name);
  fs.writeFileSync(file_path + ".txt", error);

  console.warn(error);

  const current_log_files = fs.readdirSync(logs_path);

  if (current_log_files.length <= 100) {
    return;
  }
}
