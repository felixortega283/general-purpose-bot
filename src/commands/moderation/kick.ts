import {
  SlashCommandBuilder,
  InteractionContextType,
  ChatInputCommandInteraction,
  MessageFlags,
  EmbedBuilder,
} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the targetted user.")
    .setContexts(InteractionContextType.Guild)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to kick.")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason you kick the user"),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target");

    if (!target) {
      await interaction.reply({
        content: "Please specify a target.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    if (!interaction.guild) {
      await interaction.reply({
        content: "Error: interaction.guild is null or undefined.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    const target_guild = await interaction.guild?.members.fetch(target);

    if (!target_guild) {
      await interaction.reply({
        content: "Error fetching target",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    if (!target_guild.kickable) {
      await interaction.reply({
        content: "I don't have permission to kick this user.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    let reason = await interaction.options.getString("reason");

    if (!reason) {
      reason = "No reason provided.";
    }

    const embed = new EmbedBuilder()
      .setTitle("You've been kicked from " + interaction.guild.name)
      .addFields({ name: "Reason:", value: reason });

    const dm = await target.createDM();
    dm.send({ embeds: [embed] });
    await interaction.guild.members.kick(target);
    await interaction.reply(`${target.username} was comically kicked!`);
  },
};
