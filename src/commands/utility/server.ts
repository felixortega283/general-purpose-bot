import {
  SlashCommandBuilder,
} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction: {
    reply: (arg0: string) => any;
    guild: { name: string; memberCount: number };
  }) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`,
    );
  },
};
