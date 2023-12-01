import { connectToDatabase } from "../utils/database/services/database.service";
import { CommandInteraction, TextChannel } from "discord.js";

module.exports = {
    run(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return
        let channelID: string;
        connectToDatabase().then(async (collections) => {
            const collectionArray = (await collections.guildConfig?.find({ guildID: interaction.guild?.id }).toArray());
            if (collectionArray === undefined) return;
            const config = collectionArray[0]
            channelID = config.welcomeChannel
            const channel: TextChannel = interaction.client.channels.cache.find(ch => ch.id === channelID) as TextChannel;
            switch (interaction.options.getSubcommand()) {
                case "query":
                    if (config.doWelcomeMessafe === true) {
                        interaction.reply(`The current welcome message channel is ${channel}`)
                    } else {
                        interaction.reply("Welcome messages are currently turned off.")
                    }
                    break;
                case "dowelcomemessage":
                    const bool: boolean = interaction.options.get("boolean")?.value as boolean //will always be a boolean because the option is a booleanOption

                    if (config.doWelcomeMessage === bool) {
                        switch (bool) {
                            case true:
                                interaction.reply("Welcome messages are already turned on.")
                                return
                            case false:
                                interaction.reply("Welcome messages are already turned off.")
                                return
                        }
                    }

                    await collections.guildConfig?.updateOne({ guildID: interaction.guild?.id }, {
                        $set: {
                            doWelcomeMessage: bool
                        }
                    }).then(() => {
                        interaction.reply("Updated your welcome message status.")
                    })
                    break;
                case "setchannel":
                    const newChannelID: string = interaction.options.get("channel")?.value as string

                    if (newChannelID === channelID) {
                        interaction.reply(`${channel?.name} is already the welcome channel.`)
                        return
                    }

                    await collections.guildConfig?.updateOne({ guildID: interaction.guild?.id }, {
                        $set: {
                            welcomeChannel: newChannelID
                        }
                    }).then(() => {
                        interaction.reply(`Updated your welcome message channel to ${interaction.client.channels.cache.get(newChannelID)}.`)
                    })
                    break;
                default:
                    interaction.reply("Something went very wrong.")
            }
        })
    }
}