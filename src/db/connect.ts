// src/db/connect.ts

import mongoose from "mongoose";
import config from "config";
import log from "../logger";

async function connect() : Promise<void> {
    const dbUri = config.get("dbUri") as string;

    try{
        await mongoose
            .connect(dbUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });

        mongoose.set('debug', true);

    } catch(error){
        log.error("db error", error);
        process.exit(1);
    }

    log.info("Database connected");
}

export default connect;