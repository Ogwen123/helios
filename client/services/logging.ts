import { ChannelType, Collection, ColorResolvable, EmbedBuilder, Events, Guild, Message, TextChannel } from "discord.js";
import { connectToDatabase } from "../utils/database/services/database.service"
import configFile from "../config/service_config.json"

async function getLoggingChannel(guild: Guild): Promise<TextChannel | void> {

    const collections = await connectToDatabase()
    const results = await collections.guildConfig?.find({ guildID: guild?.id }).toArray()
    if (!results) return
    return guild.channels.cache.find(channel => (channel as TextChannel).name === results[0].loggingChannelID) as TextChannel

}

export function logMessageDelete(message: Message) {

    const embed = new EmbedBuilder()

    embed.setColor(configFile.logging["info"].colour as ColorResolvable)
    embed.setTitle(`${message.author.username}'s (${message.author.id}) was deleted in ${message.channel} (${message.channelId})`)
    embed.setThumbnail(message.author.defaultAvatarURL)

    console.log(message)

    if (message.guild) getLoggingChannel(message.guild).then((channel) => {
        if (!channel) return
        console.log(channel)
        channel.send({ embeds: [embed] })
    })
}   