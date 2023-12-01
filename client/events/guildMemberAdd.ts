import { Events, GuildMember, TextChannel } from "discord.js"
import { connectToDatabase } from "../utils/database/services/database.service"

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async run(guildMember: GuildMember) {

        let channelID: string;
        connectToDatabase().then(async (collections) => {
            const collection = (await collections.guildConfig?.find({ guildID: guildMember.guild?.id }).toArray());
            if (collection === undefined) return;
            const config = collection[0]

            const doWelcomeMessage = config.doWelcomeMessage
            if (doWelcomeMessage) return;
            channelID = config.welcomeChannel

            const channel = guildMember.guild.client.channels.cache.get(channelID);

            if (channelID === "" && doWelcomeMessage === true) {
                const tempChannel: TextChannel = guildMember.client.channels.cache.find(channel => (channel as TextChannel).name === config.defaultWelcomeMessageChannel) as TextChannel
                tempChannel.send("You do not have a welcome channel set but you have welcoming turned on.\nEither turn of welcoming with \`/welcomemessage dowelcomemessage False\`\nOr set a welcome channel with \`/welcomemessage setchannel <channel id>\`")
            }

            if (channel?.isTextBased()) {
                channel.send(`Welcome <@${guildMember.id}>`)
            }
        })
    }
}