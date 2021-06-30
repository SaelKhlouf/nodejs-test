import {UserDocument, UserDTO} from "./models";

export function MapUserDTO(userDocument: UserDocument): UserDTO{
    return {
        id: userDocument._id,
        name: userDocument.name,
        email: userDocument.email,
        role: userDocument.role,
        createdAt: userDocument.createdAt
    };
}