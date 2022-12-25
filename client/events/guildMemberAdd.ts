import { Client, Events, GuildMember } from "discord.js"
import { connectToDatabase, collections } from "../database/services/database.service"

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async run(guildMember: GuildMember) {

        let channelID: string;
        connectToDatabase().then(async () => {
            const collection = (await collections.guildConfig?.find({ guildID: guildMember.guild?.id }).toArray());
            if (collection === undefined) return;
            const config = collection[0]
            if (!config.doWelcomeMessage) return;
            channelID = config.welcomeChannel
            const channel = guildMember.guild.client.channels.cache.find(ch => ch.id === channelID);
            if (channel?.isTextBased()) {
                channel.send(`Welcome <@${guildMember.id}>`)
            }
        })
    }
}