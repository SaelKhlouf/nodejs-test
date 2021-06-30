import mongoose from "mongoose";
import {UserRolesEnum} from "../../shared/models";

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true }, //unique will create an index.
        name: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
    },
    { timestamps: true } // createdAt + updatedAt
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    role: UserRolesEnum.User;
    createdAt: Date;
    updatedAt: Date;
}

export default User;

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    role: UserRolesEnum;
    createdAt: Date;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthenticateUserRequest {
    email: string;
    password: string;
}
