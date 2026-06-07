import type { Attributes, ModelCtor, Sequelize } from "sequelize";
import type { GuildSettingsType } from "../@types/guild_settings.js";

export default (
  sequelize: Sequelize,
  DataTypes: any,
) => {
  return sequelize.define(
    "guild_settings",
    {
      guild_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },

      moderator_role: {
        type: DataTypes.STRING,
      },

      moderation_commands_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};
