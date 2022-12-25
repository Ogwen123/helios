//TODO: add guild to database on join
// * set general as the default welcome message channel

import { collections, connectToDatabase } from "../database/services/database.service";
import { Events, Guild, TextChannel } from "discord.js";
import configFile from "../config/event_config.json"

module.exports = {
    name: Events.GuildCreate,
    once: false,
    run(guild: Guild) {
        const config = configFile.guildCreate

        connectToDatabase().then(async () => {

            const existingGuildConfig = (await collections.guildConfig?.find({ guildID: guild?.id }).toArray());
            console.log(existingGuildConfig)

            if (existingGuildConfig!.length > 0) {
                // reset the guild in the data base if they are somehow
                //in the database but the bot wasn't in the guild
                await collections.guildConfig?.updateOne({ guildID: guild?.id }, {
                    $set: {
                        welcomeChannel: "",
                        doWelcomeMessage: false
                    }
                }).then(() => {
                    const landingChannel: TextChannel = guild.channels.cache.find(channel => (channel as TextChannel).name === config.defaultWelcomeMessageChannel) as TextChannel

                    landingChannel.send("Thank you for inviting me!\n• To enable welcoming run \`/welcomemessage setchannel <channel id>\`\n• Then run \`/welcomemessage dowelcomemessage True\` to enable it.")
                })

                return
            }

            await collections.guildConfig?.insertOne({
                guildID: guild?.id,
                welcomeChannel: "",
                doWelcomeMessage: false

            }).then(() => {
                const landingChannel: TextChannel = guild.channels.cache.find(channel => (channel as TextChannel).name === config.defaultWelcomeMessageChannel) as TextChannel

                landingChannel.send("Thank you for inviting me!\n• To enable welcoming run \`/welcomemessage setchannel <channel id>\`\n• Then run \`/welcomemessage dowelcomemessage True\` to enable it.")
            })
        })

    }
}
