import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionContextType,
} from "discord.js";

import info from "../../../package.json" with { type: "json" };

export const command = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Shows bot info command.")
    .setContexts(InteractionContextType.Guild),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle("Bot Info")
      .addFields({ name: "Version", value: info.version });

    interaction.reply({ embeds: [embed] });
  },
};
