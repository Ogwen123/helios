import { Client, GatewayIntentBits, REST, Routes } from "discord.js"
import config from "./config.json"
import commandBuilder from "./commandBuilder"

const token = config.token
const client_id = config.client_id

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

const commands = commandBuilder

// noinspection
const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(client_id), { body: commands }).then(() => {
    console.log("Slash commands loaded")
})

client.login(token).then(() => {
    if (!client.user || !client.application) {
        return;
    }
    console.log(`${client.user.tag} has logged in!`);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const file_name = interaction.commandName + ".ts";
    const file = require(`./commands/${file_name}`)
    file.main(interaction)
});

