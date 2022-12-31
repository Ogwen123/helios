import { CommandInteraction, GuildMember } from "discord.js";

module.exports = {
    run(interaction: CommandInteraction) {
        const member: GuildMember = interaction.options.getMember("user") as GuildMember

        const botID = interaction.client.application.id
        const bot = interaction.guild?.members.cache.get(botID)

        if (member?.id === botID) {
            interaction.reply("I cannot kick myself.")
            return
        } else if (member.roles.highest.position > bot?.roles.highest.position!) {
            interaction.reply("This user has higher permissions than me so I am unable to kick them.")
            return
        }

        let reason;
        if (interaction.options.get("reason")?.value as string) reason = interaction.options.get("reason")?.value as string
        else reason = "None given"

        member.kick(reason)

    }
}