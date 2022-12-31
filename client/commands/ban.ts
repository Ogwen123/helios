import { CommandInteraction, GuildMember } from "discord.js"

module.exports = {
    run(interaction: CommandInteraction) {
        const member: GuildMember = interaction.options.getMember("user") as GuildMember

        const botID = interaction.client.application.id
        const bot = interaction.guild?.members.cache.get(botID)

        if (member?.id === botID) {
            interaction.reply("I cannot ban myself.")
            return
        } else if (member.roles.highest.position > bot?.roles.highest.position!) {
            interaction.reply("This user has higher permissions than me so I am unable to ban them.")
            return
        }

        let reason;
        if (interaction.options.get("reason")?.value as string) reason = interaction.options.get("reason")?.value as string
        else reason = "None given"

        member.ban({ deleteMessageSeconds: 60 * 60 * 24 * 5/*last 5 days of messages*/, reason: reason })

    }
}