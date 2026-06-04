import { Model, Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import "dotenv/config.js";
import { log_error } from "./logging.js";

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

export const data: any = {}

data.guild_settings = sequelize.define("guild_settings", {
  guild_id: {
    type: DataTypes.STRING,
    unique: true
  },
  moderator_role_id: {
    type: DataTypes.STRING
  }
});

export function sync_data() {
    for (const db in data) {
        data[db].sync()
    }
}