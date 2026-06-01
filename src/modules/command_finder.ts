import fs from "node:fs"
import path from "node:path"
import type { SlashCommandData } from "../@types/slash_command_data.js"

const __dirname = import.meta.dirname;

export function find_commands(): SlashCommandData[] {
    let commands: SlashCommandData[] = []
    const root_command_folder_path = path.join(__dirname, "commands");
    const command_folders = fs.readdirSync(root_command_folder_path);

    for (const command_folder in command_folders){
        const command_folder_path = path.join(root_command_folder_path, command_folder);
        const command_files = fs.readdirSync(command_folder_path);

        for (const command_file in command_files){
            if (!command_file.endsWith(".js")){continue};
            const command_path = path.join(command_folder_path, command_file)
            const command = require(command_path)

            commands.push(command);
        }
    }

    return commands
};