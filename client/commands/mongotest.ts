import { CommandInteraction } from "discord.js"
import { connectToDatabase, collections } from "../database/services/database.service"


module.exports = {
    async main(interaction: CommandInteraction) {
        let channelID: string;
        connectToDatabase().then(async () => {
            const collection = (await collections.guildConfig?.find({ guildID: interaction.guild?.id }).toArray());
            if (collection === undefined) return;
            const config = collection[0]
            channelID = config.welcomeChannel
            const channel = interaction.client.channels.cache.find(ch => ch.id === channelID);

            if (channel?.isTextBased()) {
                channel.send(`fhdf`)
            }
        })
    }
}