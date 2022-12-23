import { SlashCommandBuilder } from "discord.js"


const mathsBuilder = new SlashCommandBuilder()
    .setName("maths")
    .setDescription("Will do maths for you.")
    .addStringOption((option) => option
        .setName("operation")
        .setDescription("Operation you want to perform")
        .setRequired(true)
        .addChoices(
            { name: "add", value: "add" },
            { name: "subtract", value: "subtract" },
            { name: "multiply", value: "multiply" },
            { name: "divide", value: "divide" })
    )
    .addStringOption((option) => option
        .setName("value1")
        .setDescription("The first number.")
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName("value2")
        .setDescription("The second number.")
        .setRequired(true)
    )


//convert to json format
const mathsCommand = mathsBuilder.toJSON()



export default [
    mathsCommand
]