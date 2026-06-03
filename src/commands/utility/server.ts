import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionContextType,
  SlashCommandBuilder,
} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server.")
    .setContexts(InteractionContextType.Guild),
  async execute(interaction: ChatInputCommandInteraction) {
    // interaction.guild is the object representing the Guild in which the command was run
    if (!interaction.guild) {
      await interaction.reply("There was an error running this command.")
      console.log("Guild doesn't exist when running /server");
      return;
    }

    const embed_reply = new EmbedBuilder()
      .setTitle(interaction.guild.name)
      .setThumbnail(interaction.guild.iconURL())
      .setColor("Aqua")
      .addFields(
        {
          name: "Members",
          value: interaction.guild.memberCount.toString(),
          inline: true,
        },
        {
          name: "Created on:",
          value: interaction.guild.createdAt.toString(),
          inline: true,
        },
      );

    await interaction.reply({ embeds: [embed_reply] });
  },
};
