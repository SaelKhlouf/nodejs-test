import {Express, Request, Response, NextFunction} from "express";
import validateRequest from "./middlewares/validateRequest";
import {
    authenticateHandler,
    createUserHandler,
    deleteUserHandler,
    getAllUsersHandler
} from "./features/users/controller";
import {createUserRequest, deleteUserRequest, getAllUsersRequest} from "./features/users/validators";
import authenticateUser from "./middlewares/authenticateUser";
import authorizeUser from "./middlewares/authorizeUser";
import {UserRolesEnum} from "./shared/models";

export default function (app: Express) {
    app.get('/health-check',
        (req : Request, res: Response) => res.sendStatus(204)
    );

    app.post('/auth/login',
        (req: Request, res: Response, next: NextFunction) => authenticateHandler(req, res).catch(next)
    );

    app.get('/api/users',
        validateRequest(getAllUsersRequest),
        (req: Request, res: Response, next: NextFunction) => getAllUsersHandler(req, res).catch(next)
    );
    app.post('/api/users',
        validateRequest(createUserRequest),
        (req: Request, res: Response, next: NextFunction) => createUserHandler(req, res, next).catch(next)
    );
    app.delete('/api/users/:id',
        authenticateUser,
        authorizeUser([UserRolesEnum.Admin, UserRolesEnum.GuideLead]),
        validateRequest(deleteUserRequest),
        (req: Request, res: Response, next: NextFunction) => deleteUserHandler(req, res).catch(next)
    );
}
