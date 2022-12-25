import { CommandInteraction } from "discord.js"

module.exports = {
    main(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return
        let value_1: string = interaction.options.get("value1")?.value as string
        let value_2: string = interaction.options.get("value2")?.value as string

        if (isNaN(parseInt(value_1)) || isNaN(parseInt(value_2))) {
            interaction.reply("You must provide 2 numbers")
        }

        switch (interaction.options.get("operation")?.value) {
            case "add":
                interaction.reply(`${value_1} + ${value_2} = ${parseInt(value_1) + parseInt(value_2)}`)
                break
            case "subtract":
                interaction.reply(`${value_1} - ${value_2} = ${parseInt(value_1) - parseInt(value_2)}`)
                break
            case "multiply":
                interaction.reply(`${value_1} x ${value_2} = ${parseInt(value_1) * parseInt(value_2)}`)
                break
            case "divide":
                interaction.reply(`${value_1} ÷ ${value_2} = ${parseInt(value_1) / parseInt(value_2)}`)
                break
            default:
                interaction.reply("Something went terribly wrong")
                break
        }
    }
}