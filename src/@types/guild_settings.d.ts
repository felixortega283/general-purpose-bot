import type { Model, ModelCtor } from "sequelize";

export interface GuildSettingsType extends Model {
    guild_id: string,
    moderator_role: string,
    moderation_commands_enabled: boolean
}