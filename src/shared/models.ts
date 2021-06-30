export interface ErrorResponse{
    title: string;
    message: string;
    statusCode: number;
    stackTrace?: string;
}

export enum UserRolesEnum {
    User = 'user',
    Admin = 'admin',
    Guide = 'guide',
    GuideLead = 'GuideLead',
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRolesEnum;
    iat: Date;
    exp: Date;
}

export interface TokenWrapper {
    accessToken: string;
    username: string;
    expiresIn: string;
}

export interface PaginationQuery {
    skip?: number;
    limit?: number;
    sort?: string;
}

export type PaginatedData<T> = {
    data: T[];
    count: number;
}