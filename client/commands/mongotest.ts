import { CommandInteraction } from "discord.js"
import { connectToDatabase, collections } from "../database/services/database.service"


module.exports = {
    run(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return
        let channelID: string;
        connectToDatabase().then(async () => {
            const collection = (await collections.guildConfig?.find({ guildID: interaction.guild?.id }).toArray());
            if (collection === undefined) return;
            const config = collection[0]
            if (!config.doWelcomeMessage) interaction.reply("welcome messages are turned off")
            channelID = config.welcomeChannel

            interaction.reply(channelID)
        })
    }
}