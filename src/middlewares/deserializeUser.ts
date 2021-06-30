import {NextFunction, Response, Request} from "express";
import {decode} from "../utils/jwt";
import log from "../logger";
import _ from "lodash";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = _.get(req, "headers.authorization")
    if (!authHeader){
        return ;
    }

    const accessToken = authHeader.replace(
        /^Bearer\s/,
        ""
    );

    const { decoded } = decode(accessToken);

    if (decoded) {
        // @ts-ignore
        req.user = decoded;
        return;
    }
    return;
};

export default deserializeUser;
