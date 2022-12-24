import { ObjectId } from "mongodb"

export default class GuildConfig {
    constructor(public welcomeChannel: string, public guildID: string, public id?: ObjectId) { }
}