import { connectToDatabase } from "../utils/database/services/database.service";
import { ChannelType, Events, Guild, TextChannel } from "discord.js";
import configFile from "../config/event_config.json"

module.exports = {
    name: Events.GuildCreate,
    once: false,
    run(guild: Guild) {
        const config = configFile.guildCreate

        connectToDatabase().then(async (collections) => {
            //*DATABASE HANDLING
            const existingGuildConfig = (await collections.guildConfig?.find({ guildID: guild?.id }).toArray());
            if (existingGuildConfig!.length > 0) {
                const results = await collections.guildConfig?.updateOne({ guildID: guild?.id }, {
                    $set: {
                        welcomeChannel: "",
                        doWelcomeMessage: false
                    }
                })

                const landingChannel: TextChannel = guild.channels.cache.find(channel => (channel as TextChannel).name === config.defaultWelcomeMessageChannel) as TextChannel
                if (!landingChannel) return
                landingChannel.send("Thank you for inviting me!\n   • To enable welcoming run \`/welcomemessage setchannel <channel id>\`\n    • Then run \`/welcomemessage dowelcomemessage True\` to enable it.")

                return
            }

            // logging
            const loggingChannel = await guild.channels.create({
                name: "utils-logging",
                type: ChannelType.GuildText
            })

            await collections.guildConfig?.insertOne({
                guildID: guild?.id,
                name: guild?.name,
                welcomeChannel: "",
                doWelcomeMessage: false,
                active: true,
                loggingChannelID: loggingChannel.id
            })

            const landingChannel: TextChannel = guild.channels.cache.find(channel => (channel as TextChannel).name === config.defaultWelcomeMessageChannel) as TextChannel
            if (!landingChannel) return
            landingChannel.send("Thank you for inviting me!\n   • To enable welcoming run \`/welcomemessage setchannel <channel id>\`\n    • Then run \`/welcomemessage dowelcomemessage True\` to enable it.")

        })

    }
}
