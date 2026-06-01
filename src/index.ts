// Some of this is part of the official Discord.js documentation

import fs, { readdirSync } from "node:fs";
import path from "node:path";
import "dotenv/config.js";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import { find_commands } from "./modules/command_finder.js";
import type { SlashCommandData } from "./@types/slash_command_data.js";

// Source - https://stackoverflow.com/a/50052194
// Posted by GOTO 0, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-01, License - CC BY-SA 4.0

const __dirname = import.meta.dirname;
const token = process.env.DISCORD_BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const folders_path = path.join(__dirname, "commands");
const command_folders = fs.readdirSync(folders_path);

for (const folder of command_folders) {
  const commands_path = path.join(folders_path, folder);
  const command_files = readdirSync(commands_path).filter((file) =>
    file.endsWith(".js"),
  );

  for (const file of command_files) {
    const file_path = path.join(commands_path, file);
    const command_data: SlashCommandData = await import(file_path);
	const command = command_data.command

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(
        `[WARNING] The command at ${file_path} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token

client.login(token);
