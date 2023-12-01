import { connectToDatabase } from "../utils/database/services/database.service";
import { Events, Guild } from "discord.js";

module.exports = {
    name: Events.GuildDelete,
    once: false,
    run(guild: Guild) {
        //*DATABASE HANDLING
        connectToDatabase().then(async (collections) => {
            const existingGuildConfig = (await collections.guildConfig?.find({ guildID: guild?.id }).toArray());

            if (existingGuildConfig!.length === 0) { // handles the guild not being in the database
                console.error(`A guild (${guild?.id}) was in a server but not in the database.`)
                return
            } else if (existingGuildConfig!.length > 1) { // handles the guild being in the database multiple times
                console.error(`A guild (${guild?.id}) was in the database multiple times.`)
                await collections.guildConfig?.deleteMany({ guildID: guild?.id })
                return
            }

            await collections.guildConfig?.updateOne({ guildID: guild?.id }, {
                $set: {
                    welcomeChannel: "",
                    doWelcomeMessage: false,
                    active: true
                }
            }).then(() => {
                console.log(`Removed/left guild ${guild?.name} (${guild?.id})`)
            })
        })
    }
}