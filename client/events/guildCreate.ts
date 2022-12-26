import { collections, connectToDatabase } from "../database/services/database.service";
import { Events, Guild, TextChannel } from "discord.js";
import configFile from "../config/event_config.json"

module.exports = {
    name: Events.GuildCreate,
    once: false,
    run(guild: Guild) {
        const config = configFile.guildCreate

        connectToDatabase().then(async () => {
            //*DATABASE HANDLING
            const existingGuildConfig = (await collections.guildConfig?.find({ guildID: guild?.id }).toArray());
            if (existingGuildConfig!.length > 0) {
                //reset the guild in the database if they are somehow
                //already in the database with out the bot being in 
                //the guild, this shouldn't happen but you never know
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
