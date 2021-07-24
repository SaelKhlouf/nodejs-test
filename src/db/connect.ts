// src/db/connect.ts

import mongoose from "mongoose";
import config from "config";
import log from "../logger";

async function connect() : Promise<void> {
    // use when starting application locally
    const dbUri = config.get("dbUri") as string;
    // use when starting application as docker container
    const dbUriDocker = config.get("dbUriDocker") as string;
    // pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
    let mongoClientOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

    try{
        await mongoose
            .connect(dbUriDocker, mongoClientOptions);

        mongoose.set('debug', true);

    } catch(error){
        log.error("db error", error);
        console.log(JSON.stringify(error));
        process.exit(1);
    }

    log.info("Database connected");
}

export default connect;