import {NextFunction, Request, Response} from "express";
import {authenticateUser, createUser, deleteUser} from "./service";
import {MapUserDTO} from "./helpers";
import _ from "lodash";
import User, {UserDocument, UserDTO} from "./models";
import {PaginatedData} from "../../shared/models";
import {getAll} from "../../shared/handlerFactory";

export async function createUserHandler(req: Request, res: Response, next: NextFunction) : Promise<Response<UserDTO>> {
    const user = await createUser(req.body);
    const userDTO = MapUserDTO(user);
    return res.json(userDTO);
}

export async function deleteUserHandler(req: Request, res: Response) : Promise<Response<void>> {
    await deleteUser(req.params.id);
    return res.sendStatus(204);
}

export async function getAllUsersHandler(req: Request, res: Response): Promise<Response<PaginatedData<UserDTO>>> {
    const paginatedData = await getAll<UserDocument>(User, {}, req.query);
    const response = {
        data: _.map(paginatedData.data, user => MapUserDTO(user)),
        count: paginatedData.count
    }
    return res.json(response);
}

export async function authenticateHandler(req: Request, res: Response) {
    const data = await authenticateUser(req.body);
    return res.json(data);
}