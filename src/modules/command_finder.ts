import fs from "node:fs";
import path from "node:path";
import type { SlashCommandData } from "../@types/slash_command_data.js";
import { __dirname } from "../__dirname.js";

export async function find_commands(): Promise<SlashCommandData> {
  let commands: SlashCommandData[] = [];
  const root_command_folder_path = path.join(__dirname, "commands");
  const command_folders = fs.readdirSync(root_command_folder_path);

  for (const command_folder of command_folders) {
    const command_folder_path = path.join(
      root_command_folder_path,
      command_folder,
    );
    const command_files = fs.readdirSync(command_folder_path);

    for (const command_file of command_files) {
      if (!command_file.endsWith(".js")) {
        continue;
      }
      const command_path = path.join(command_folder_path, command_file);
      const command_raw: SlashCommandData = await import(command_path);
      const command = command_raw.command
      
      if ("data" in command && "execute" in command) {
        commands.push(command)
      } else {
        console.warn(
          `[WARNING] The command at ${command_path} is missing a required "data" or "execute" property.`,
        );
      }
    }
  }

  return commands;
}
