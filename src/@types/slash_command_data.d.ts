import type { SlashCommandBuilder } from "discord.js";

export interface SlashCommandData extends Promise<any> {
  command: {
    data?: SlashCommandBuilder,
    execute?: Function
  }
}
