import express, {NextFunction, Request, Response} from "express";
import config from "config";
import routes from "./routes";
import connect from "./db/connect";
import log from "./logger";
import {handleError} from "./utils/baseError";
import deserializeUser from "./middlewares/deserializeUser";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
    await deserializeUser(req, res, next);
    next();
});

app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

routes(app);

app.use((err: Error, req:Request, res:Response, next: NextFunction) => {
    handleError(err, res, next);
});

app.listen(port, host, async () => {
    await connect();
    log.info(`Server listing at http://${host}:${port}`);
});
