import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

import info from "../../../package.json" with { type: "json" };

export const command = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Shows bot info command."),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle("Bot Info")
      .addFields({ name: "Version", value: info.version });

    interaction.reply({ embeds: [embed] });
  },
};
