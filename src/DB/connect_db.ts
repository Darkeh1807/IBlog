import { connect, connection } from "mongoose"
import { config } from "dotenv"
import consola from "consola";

config();
const MONGOURL = process.env.MONGOURL ?? "";

//Establish and handle db connection
const dbConnection = connect(MONGOURL).then(() => {
    consola.success("DB connection establieshed")
    return connection;
}).catch((e) => {
    consola.error(e);
    return e;
})

export default dbConnection;