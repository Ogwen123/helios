import { CommandInteraction, Events } from "discord.js"

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    run(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const file_name = interaction.commandName + ".ts";
        const file = require(`../commands/${file_name}`)
        file.run(interaction)
    }
}