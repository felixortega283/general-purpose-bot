import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionContextType,
  MessageFlags,
} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("timeout-remove")
    .setDescription("Removes timeouts from people.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to remove the timeout from")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason to remove the mute"),
    )
    .setContexts(InteractionContextType.Guild),
  async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target", true);
    let reason = interaction.options.getString("reasons");

    if (!reason) {
      reason = "No reason provided.";
    }

    if (!interaction.guild) {
      await interaction.reply({
        content: "interaction.guild is null or undefined",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    const member = await interaction.guild.members.fetch(target);

    if (!member.isCommunicationDisabled) {
      await interaction.reply({
        content: "Member is not timed out.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`Your timeout from ${interaction.guild.name} has been removed.`)
      .addFields({ name: "Reason", value: reason });

    const dm = await target.createDM();
    dm.send({ embeds: [embed] });

    member.disableCommunicationUntil(null);
    interaction.reply(`Timeout removed from ${target.username}`);
  },
};
