//TODO: add guild to database on join
//TODO:

import { Client, GatewayIntentBits, REST, Routes } from "discord.js"
import SD from "./config/database.config"
import commandBuilder from "./commandBuilder"
import path from "node:path"
import fs from "node:fs"
import { Logger } from "./utils/logger"

const token: string = <string>SD.token
const client_id: string = <string>SD.clientID

export const logger = new Logger("HELIOS")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

const commands = commandBuilder

// noinspection
const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(client_id), { body: commands }).then(() => {
    logger.info("Slash commands loaded")
})

client.login(token)

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts')); // filters the files and only loads ones that end in ts

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
    } else {
        client.on(event.name, (...args) => event.run(...args));
    }
}
logger.info("Event handler loaded.")


