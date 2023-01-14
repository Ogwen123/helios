import { CommandInteraction } from "discord.js";

module.exports = {
    run(interaction: CommandInteraction) {
        interaction.reply("eval")
    }
}