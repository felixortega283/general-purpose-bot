import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Collection,
  MessageFlags,
  InteractionContextType,
} from "discord.js";
import { GuildSettings } from "../../db_objects.js";
import type { GuildSettingsType } from "../../@types/guild_settings.js";
import type { Attributes } from "sequelize";

export const command = {
  data: new SlashCommandBuilder()
    .setName("server-settings")
    .setDescription("Settings to change for the server.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mod-role")
        .setDescription("The role that gives moderators bot perms.")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("The role used for moderators.")
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("moderation-enabled")
        .setDescription(
          "Whether youw want to enable moderation commmands or not.",
        )
        .addBooleanOption((option) =>
          option
            .setName("enabled")
            .setDescription(
              "False if you want to disable moderation commands, and true if they should stay enabled.",
            )
            .setRequired(true),
        ),
    )
    .setContexts(InteractionContextType.Guild),
  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();

    if (!interaction.guild) {
      await interaction.reply({
        content: "Error: interaction.guildId doesn't exist.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    if (!interaction.guildId) {
      await interaction.reply({
        content: "Error: interaction.guildId doesn't exist.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    let guild_settings: Attributes<GuildSettingsType> =
      await GuildSettings.findOne({ where: { guild_id: interaction.guildId } });

    if (!guild_settings) {
      guild_settings = GuildSettings.create({ guild_id: interaction.guildId });
    }

    if (subcommand === "mod-role") {
      const role = interaction.options.getRole("role", true);

      if (role.id === guild_settings.moderator_role) {
        await interaction.reply({
          content: `Role is already set to ${role}.`,
          flags: MessageFlags.Ephemeral,
        });
      }

      if (!interaction.guild.roles.fetch(role.id)) {
        await interaction.reply({
          content: "Role isn't in server",
          flags: MessageFlags.Ephemeral,
        });

        return;
      }

      guild_settings.moderator_role = role.id;
    }

    if (subcommand === "moderation-enabled") {
      const enabled_bool = interaction.options.getBoolean("enabled", true);

      if (enabled_bool === guild_settings.moderation_commands_enabled) {
        await interaction.reply({
          content: `Moderation commands already set to ${enabled_bool}`,
          flags: MessageFlags.Ephemeral,
        });

        return;
      }

      guild_settings.moderation_commands_enabled = enabled_bool;
      await interaction.reply({
        content: `Moderation commands set to ${enabled_bool}`,
      });
    }

    guild_settings.save();
  },
};
