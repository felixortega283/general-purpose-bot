// Some of this is part of the official Discord.js documentation
import "dotenv/config.js";
import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  MessageFlags,
} from "discord.js";
import { find_commands } from "./modules/command_finder.js";
import { log_error } from "./modules/logging.js";
import { sync_data } from "./modules/data.js";

// Source - https://stackoverflow.com/a/50052194
// Posted by GOTO 0, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-01, License - CC BY-SA 4.0

const token = process.env.DISCORD_BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commands = await find_commands();

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  sync_data()
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command_name = interaction.commandName;
  const command = interaction.client.commands.get(command_name);

  if (!command) {
    console.warn(`No matching ${command_name} was found`);
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    log_error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

// Log in to Discord with your client's token

client.login(token);
