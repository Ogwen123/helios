import { Client, Events } from "discord.js";

module.exports = {
    name: Events.ClientReady,
    once: true,
    run(client: Client) {
        console.log(`${client.user?.tag} is ready!`)
    }
}