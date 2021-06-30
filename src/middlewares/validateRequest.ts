import { Request, Response, NextFunction } from "express";
import log from "../logger";
import {AnySchema} from "joi";

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        log.info('req.params ' + JSON.stringify(req.params));
        log.info('req.query ' + JSON.stringify(req.query));
        await schema.validateAsync(req, {
            abortEarly: false,
            allowUnknown: true
        }); //abort early is for getting all errors and the first error only.
        return next();
    } catch (e) {
        log.error(e);
        const validationErrors: string[] = e.details.map(
            (detail: { message: string }) => detail.message.replace(/"/g, "")
        );
        const response = {
            validationErrors
        }
        return res.status(400).json(response);
    }
};

export default validate;