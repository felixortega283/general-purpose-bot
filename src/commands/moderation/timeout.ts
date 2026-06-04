import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  InteractionContextType,
  MessageFlags,
  EmbedBuilder,
} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Times out the selected target")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to time out")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason given for the timeout"),
    )
    .setContexts(InteractionContextType.Guild)
    .addIntegerOption((option) =>
      option
        .setName("days")
        .setDescription("Amount of hours that the person is timed out for."),
    )
    .addIntegerOption((option) =>
      option
        .setName("hours")
        .setDescription("Amount of hours that the target is timed out for."),
    )
    .addIntegerOption((option) =>
      option
        .setName("minutes")
        .setDescription("Amount of minutes that the target is timed out for."),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target", true);
    let reason = interaction.options.getString("reason");

    const days = interaction.options.getInteger("days");
    const hours = interaction.options.getInteger("hours");
    const minutes = interaction.options.getInteger("minutes");

    let timeout_ms = 0;

    if (days) {
      timeout_ms += days * 86400000;
    }

    if (hours) {
      timeout_ms += hours * 3600000;
    }

    if (minutes) {
      timeout_ms += minutes * 60000;
    }

    if (timeout_ms > 28 * 86400000) {
      // 28 days [ Max Discord timeout ]
      await interaction.reply({
        content: "The max timeout is 28 days.",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    if (timeout_ms === 0) {
      await interaction.reply({
        content: "Timeout cannot be 0 seconds",
        flags: MessageFlags.Ephemeral,
      });
    }

    if (!reason) {
      reason = "No reason provided";
    }

    if (!interaction.guild) {
      interaction.reply({
        content: "interaction.guild is null or undefined",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    const member = await interaction.guild.members.fetch(target);

    if (!member) {
      await interaction.reply({
        content: "User isn't in server",
        flags: MessageFlags.Ephemeral,
      });
    }

    if (!member.moderatable) {
      await interaction.reply({
        content: "I don't have enough permissions!",
        flags: MessageFlags.Ephemeral,
      });
    }

    const dm = await target.createDM();
    const embed = new EmbedBuilder().setTitle(
      `You've been timed out in ${interaction.guild.name}`,
    );

    await dm.send({ embeds: [embed] });
    await member.timeout(timeout_ms);
  },
};
