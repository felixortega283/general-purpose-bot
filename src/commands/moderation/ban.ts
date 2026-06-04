import {
  SlashCommandBuilder,
  InteractionContextType,
  MessageFlags,
  ChatInputCommandInteraction,
} from "discord.js";
import { log_error } from "../../modules/logging.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans the targeted user")
    .setContexts(InteractionContextType.Guild)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to ban.")
        .setRequired(true),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      await interaction.reply({
        content:
          "There was an error running this command. interaction.guild not found.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    const target = interaction.options.getUser("target");

    if (!target) {
      await interaction.reply({
        content: "There was an error running this command. Missing target.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    if (interaction.guild.ownerId === target.id) {
      await interaction.reply(
        "This guy tried to ban the owner. Laugh at this guy!",
      );
      return;
    }

    if (process.env.CLIENT_ID === target.id) {
      await interaction.reply(
        "Look at this dude! He tried banning me! Laught at him.",
      );
      return;
    }

    if (target.id === interaction.user.id) {
      await interaction.reply("You can't ban yourself!");
      return;
    }

    const target_guild_member = await interaction.guild.members.fetch(target);

    if (!target_guild_member) {
      await interaction.reply({
        content: "Target not found.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (!target_guild_member.bannable) {
      await interaction.reply({
        content: "Error: Not enough permissions.",
        flags: MessageFlags.Ephemeral
      })
      return;
    }

    await interaction.guild.members.ban(target)
    await interaction.reply(`${target.username} has been dramatically banned!`);
  },
};
