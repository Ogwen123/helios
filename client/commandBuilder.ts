import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js"

// * NORMAL USER COMMANDS
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
    );

// * ADMIN COMMANDS
const welcomemessageBuilder = new SlashCommandBuilder()
    .setName("welcomemessage")
    .setDescription("Change the channel in which welcome messages are sent")
    .addSubcommand((subcommand) => subcommand
        .setName("setchannel")
        .setDescription("Change the channel in which welcome messages are sent (the default is general).")
        .addChannelOption((channel) => channel
            .setName("channel")
            .setDescription("The channel you want welcome messages to be sent in.")
            .addChannelTypes(ChannelType.GuildText) //only allow the welcome channel to be set to text channels
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => subcommand
        .setName("dowelcomemessage")
        .setDescription("Turn welcome messages on or off.")
        .addBooleanOption((bool) => bool
            .setName("boolean")
            .setDescription("True to turn the welcome message on and false to turn it off.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) => subcommand
        .setName("query")
        .setDescription("Check which channel welcome message will be sent in.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const kickBuilder = new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick specified user.")
    .addUserOption((option) => option
        .setName("user")
        .setDescription("The user you want to kick.")
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName("reason")
        .setDescription("The reason for kicking the user (optional) .")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

const banBuilder = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban specified user.")
    .addUserOption((option) => option
        .setName("user")
        .setDescription("The user you want to ban.")
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName("reason")
        .setDescription("The reason for banning the user (optional) .")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

// * MY COMMANDS
const evalBuilder = new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Eval command")
    .addStringOption((option) => option
        .setName("code")
        .setDescription("The code you want to eval.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
//! DEV COMMANDS - REMOVE ONCE THEY ARE NO LONGER NEEDED
// const mongotestBuilder = new SlashCommandBuilder()
//     .setName("mongotest")
//     .setDescription("testing mongo, shouldn't be in prod, not that this bot will make it to prod");

//convert to json format
const mathsCommand = mathsBuilder.toJSON()
// const mongotestCommand = mongotestBuilder.toJSON()
const welcomemessageCommand = welcomemessageBuilder.toJSON()
const kickCommand = kickBuilder.toJSON()
const banCommand = banBuilder.toJSON()
const evalCommand = evalBuilder.toJSON()

export default [
    mathsCommand,
    //     mongotestCommand,
    welcomemessageCommand,
    kickCommand,
    banCommand,
    evalCommand
]