import {
  SlashCommandBuilder,
  InteractionContextType,
  MessageFlags,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

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
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason you want to ban a user."),
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
        content: "I don't have permission to do that :(",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    let reason = interaction.options.getString("string");

    if (!reason) {
      reason = "No reason provided.";
    }

    const ban_embed = new EmbedBuilder()
      .setTitle("You've been banned from " + interaction.guild.name)
      .addFields({ name: "Reason:", value: reason });

    const dm = await target.createDM();
    await dm.send({ embeds: [ban_embed] });

    await interaction.guild.members.ban(target);
    await interaction.reply(`${target.username} has been dramatically banned!`);
  },
};
