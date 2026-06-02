import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionContextType,
  SlashCommandBuilder,
} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The targeted user for this operation"),
    )
    .setContexts(InteractionContextType.Guild),
  async execute(interaction: ChatInputCommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild

    let target = interaction.options.getUser("target");

    if (!target) {
      target = interaction.user;
    }

    if (!interaction.guild) {
      await interaction.reply("There was an error executing this command.");
      console.log("Guild not found");
      return;
    }

    const guild_member = await interaction.guild.members.fetch(target);

    if (!guild_member.joinedAt) {
      await interaction.reply("There was an error executing this command.");
      console.log("Join date not found.");
      return;
    }

    let nickname = guild_member.nickname;

    if (!nickname) {
      nickname = target.username;
    }

    console.log(guild_member.user.createdAt.toString());
    const embed_reply = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle(target.username)
      .setThumbnail(target.avatarURL())
      .addFields(
        { name: "Nickname:", value: nickname },
        {
          name: "Joined Server On:",
          value: guild_member.joinedAt.toString(),
          inline: true,
        },
        {
          name: "Account Created On:",
          value: guild_member.user.createdAt.toString(),
          inline: true,
        },
      );

    await interaction.reply({ embeds: [embed_reply] });
  },
};
