import log from "../logger";
import {ErrorResponse} from "../shared/models";
import _ from "lodash";

export const handleError = (err, res, next) => {
    if(_.isEmpty(err)){
        next();
    }
    let { statusCode, message, title } = err;

    statusCode = statusCode ?? 500;
    message = message ?? 'An error has occurred';
    title = title ?? 'Internal server error';

    const data : ErrorResponse = {
        title: title,
        message: message,
        statusCode: statusCode
    };

    if(process.env.NODE_ENV === "local"){
        data.stackTrace = err.stack;
    }
    log.error(JSON.stringify(data));
    res.status(statusCode).json(data);
};

export class BaseError extends Error {
    statusCode: number;
    message: string;
    title: string;

    constructor(statusCode, message, title) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.title = title;
    }
}

export class BadRequestError extends BaseError {
    constructor(message) {
        super(400, message, "Bad Request");
    }
}

export class ConflictExceptionError extends BaseError {
    constructor(message) {
        super(409, message, "Conflict Exception");
    }
}