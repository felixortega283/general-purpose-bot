import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import "dotenv/config.js";
import "./models/guild-settings.js";
import { log_error } from "./modules/logging.js";

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

(await import("./models/guild-settings.js")).default(sequelize, DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize
  .sync({ force })
  .then(async () => {
    console.log("Database synced");
    sequelize.close();
  })
  .catch(log_error);
