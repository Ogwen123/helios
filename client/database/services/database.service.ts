import * as mongoDB from "mongodb";
import config from "../../config/db_config.json"

export const collections: { guildConfig?: mongoDB.Collection } = {}

//connect to database
export async function connectToDatabase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.db_connection_string)

    await client.connect()

    const db: mongoDB.Db = client.db(config.db_name);

    const guildConfigCollection: mongoDB.Collection = db.collection(config.collection_name)

    collections.guildConfig = guildConfigCollection

    //console.log(`Successfully connected to database: ${db.databaseName} and collection: ${guildConfigCollection.collectionName}`);
}