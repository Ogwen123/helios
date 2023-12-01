import * as mongoDB from "mongodb";
import SD from "../../../config/database.config"
import config from "../../../config/db_config.json"

type Collections = { guildConfig?: mongoDB.Collection }

export const collections: Collections = {}

//connect to database
export async function connectToDatabase(): Promise<Collections> {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(<string>SD.connectionString)

    await client.connect()

    const db: mongoDB.Db = client.db(config.db_name);

    const guildConfigCollection: mongoDB.Collection = db.collection(config.collection_name)

    collections.guildConfig = guildConfigCollection

    return collections
    //console.log(`Successfully connected to database: ${db.databaseName} and collection: ${guildConfigCollection.collectionName}`);
}