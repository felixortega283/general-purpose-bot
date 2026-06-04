import path from "node:path";
import fs from "node:fs";
import { __dirname } from "../__dirname.js";

export function log_error(error: any): void {
  const string_error = error.toString()
  const logs_path = path.join(__dirname, "logs");
  const date = new Date();

  const logs_exist = fs.existsSync(logs_path);

  if (!logs_exist) {
    console.log("Log folder not found. Creating log folder.");
    fs.mkdirSync(logs_path);
  }

  const file_name = date.toUTCString();
  const file_path = path.join(logs_path, file_name);
  fs.writeFileSync(file_path + ".txt", string_error);

  console.warn(error);

  const current_log_files = fs.readdirSync(logs_path);

  if (current_log_files.length <= 100) {
    return;
  }

  const file_unix_time: number[] = [];

  for (const file of current_log_files) {
    const file_name_split = file.split(".");
    const file_date: any = new Date(file_name_split[0] as string);

    if (isNaN(file_date)) {
      continue;
    }

    file_unix_time.push(file_date);
  }

  file_unix_time.sort();

  let i = file_unix_time.length - 1;

  while (file_unix_time.length > 100) {
    const file_to_remove =
      new Date(file_unix_time[i] as number).toUTCString() + ".txt";

    fs.rmSync(path.join(logs_path, file_to_remove));
    i--;
  }
}
