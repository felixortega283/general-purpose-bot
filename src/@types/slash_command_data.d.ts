import type { SlashCommandBuilder } from "discord.js";

export interface SlashCommandData extends Promise<any> {
  command: any;
  data?: SlashCommandBuilder;
  execute?: Function;
}
