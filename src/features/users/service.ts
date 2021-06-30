import User, {AuthenticateUserRequest, CreateUserRequest, UserDocument} from "./models";
import config from "config";
import {compare, hash} from "bcrypt";
import {sign} from "../../utils/jwt";
import {BadRequestError, ConflictExceptionError} from "../../utils/baseError";
import {UserRolesEnum} from "../../shared/models";
import {deleteOne, exists, getOne} from "../../shared/handlerFactory";

export async function createUser(createUserRequest: CreateUserRequest): Promise<UserDocument> {
    const userExists = await exists(User,{
        email: createUserRequest.email
    });
    if(userExists){
        throw new ConflictExceptionError("User already exists");
    }

    const saltRounds = config.get("saltRounds") as number;
    const hashedPassword: string = await hash(createUserRequest.password, saltRounds);

    return User.create({
        name: createUserRequest.name,
        email: createUserRequest.email,
        password: hashedPassword,
        role: UserRolesEnum.User,
    });
}

export async function deleteUser(id: string): Promise<void> {
    const filterQuery = {
        _id: id
    };
    const userExists = await exists(User, filterQuery);
    if(!userExists){
        throw new BadRequestError("User not found");
    }
    await deleteOne(User, filterQuery);
}

export async function authenticateUser(authenticateUserRequest: AuthenticateUserRequest) {
    const user = await getOne(User, {
        email: authenticateUserRequest.email
    });

    if(!user){
        throw new BadRequestError("User not found");
    }

    const isMatch = await compare(authenticateUserRequest.password, user.password);
    if(!isMatch){
        throw new Error("Incorrect password");
    }

    // generate and sign token
    const token = await createToken({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });

    return {
        name: user.name,
        ...token,
    }
}

async function createToken(payload: object): Promise<any> {
    const accessTokenTtl = config.get("accessTokenTtl") as string;
    const accessToken = sign(payload, {
        expiresIn: accessTokenTtl,
    });
    return {
        expiresIn: accessTokenTtl,
        accessToken,
    };
}