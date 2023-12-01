import { connectToDatabase } from "../utils/database/services/database.service";
import { ChannelType, Events, Guild, TextChannel, Message } from "discord.js";
import configFile from "../config/event_config.json"
import { logMessageDelete } from "../services/logging";

module.exports = {
    name: Events.MessageDelete,
    once: false,
    run(message: Message) {
        logMessageDelete(message)
    }
}
