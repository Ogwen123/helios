import { collections, connectToDatabase } from "../database/services/database.service";
import { CommandInteraction, TextChannel } from "discord.js";
import { Channel } from "diagnostics_channel";

module.exports = {
    main(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return
        let channelID: string;
        connectToDatabase().then(async () => {
            const collectionArray = (await collections.guildConfig?.find({ guildID: interaction.guild?.id }).toArray());
            if (collectionArray === undefined) return;
            const config = collectionArray[0]
            channelID = config.welcomeChannel
            const channel: TextChannel = interaction.client.channels.cache.find(ch => ch.id === channelID) as TextChannel;
            switch (interaction.options.getSubcommand()) {
                case "query":
                    interaction.reply(`The current welcome message channel is ${channel}`)
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
                    const newChannelID = interaction.options.get("channel")?.value

                    if (newChannelID === channelID) {
                        interaction.reply(`${channel?.name} is already the welcome channel.`)
                        return
                    }

                    await collections.guildConfig?.updateOne({ guildID: interaction.guild?.id }, {
                        $set: {
                            welcomeChannel: newChannelID
                        }
                    }).then(() => {
                        interaction.reply(`Updated your welcome message channel to ${interaction.client.channels.cache.find(ch => ch.id === newChannelID) as TextChannel}.`)
                    })
                    break;
                default:
                    interaction.reply("Something went very wrong.")


            }
        })
    }
}