import { DataTypes, Sequelize } from "sequelize";

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

export const GuildSettings = (
  await import("./models/guild-settings.js")
).default(sequelize, DataTypes);
