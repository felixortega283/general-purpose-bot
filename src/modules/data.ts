import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import "dotenv/config.js";

export const sequelize = new Sequelize(
  "database",
  "admin",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
  },
);

export const guild_settings = sequelize.define(
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
      allowNull: false
    }
  },
  {
    timestamps: false,
  },
);

export function sync_data() {
  sequelize.sync();
}
