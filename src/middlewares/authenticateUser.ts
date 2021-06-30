import {Request, Response, NextFunction} from "express";
import {ErrorResponse} from "../shared/models";
import log from "../logger";
import _ from "lodash";

const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = _.get(req, "user");
    const response: ErrorResponse = {
        title: "Unauthorized",
        statusCode: 401,
        message: "You are unauthenticated"
    }
    if (!user) {
        return res.status(401).json(response);
    }
    return next();
};

export default authenticateUser;
