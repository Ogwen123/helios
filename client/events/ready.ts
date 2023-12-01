import { Client, Events } from "discord.js";
import { logger } from "../index";

module.exports = {
    name: Events.ClientReady,
    once: true,
    run(client: Client) {
        logger.info(`${client.user?.tag} is ready!`)
    }
}