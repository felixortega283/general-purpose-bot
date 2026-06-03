import "dotenv/config.js";
import { REST, Routes } from "discord.js";
import { find_commands } from "./modules/command_finder.js";
import { log_error } from "./modules/logging.js";

const token = process.env.DISCORD_BOT_TOKEN as string;
const client_id = process.env.CLIENT_ID as string;
const test_guild_id = process.env.TEST_GUILD_ID as string;

const commands = await find_commands();
const rest = new REST().setToken(token);
const commands_JSON: JSON[] = [];

for (const command of commands) {
  commands_JSON.push(command.data.toJSON());
}

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(client_id, test_guild_id),
      { body: commands_JSON },
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    log_error(error);
  }
})();
