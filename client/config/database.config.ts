import * as dotenv from "dotenv"
dotenv.config({ path: "client/config/.env" })

export default {
    connectionString: process.env.CONNECTION_STRING || "",
    token: process.env.TOKEN || "",
    clientID: process.env.CLIENT_ID || ""
}