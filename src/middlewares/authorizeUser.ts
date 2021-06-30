import {Request, Response, NextFunction} from "express";
import {AuthUser, ErrorResponse, UserRolesEnum} from "../shared/models";
import _ from "lodash";

const authorizeUser = (roles: UserRolesEnum[]) =>
    async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const response: ErrorResponse = {
        title: "Forbidden",
        statusCode: 403,
        message: "You are unauthorized"
    }

    const authUser = _.get(req, 'user') as AuthUser;
    if (_.isEmpty(authUser)) {
        return res.status(403).json(response);
    }

    if(!_.includes(roles, authUser.role)){
        return res.status(403).json(response);
    }
    return next();
};

export default authorizeUser;
