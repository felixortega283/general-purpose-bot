// Source - https://stackoverflow.com/a/69534031
// Posted by devleo, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-01, License - CC BY-SA 4.0

import { Collection } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<any, any>;
  }
}
