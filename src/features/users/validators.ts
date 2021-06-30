import Joi from "joi";

const body = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .required()
        .min(6),

    email: Joi.string()
        .email()
        .required(),
});

const query = Joi.object({
        skip: Joi.number()
            .min(0)
            .optional(),

        limit: Joi.number()
            .max(100)
            .optional(),

        sort: Joi.string()
            .optional(),
    });


const params = Joi.object({
        id: Joi.string()
            .optional(),
    });

export const createUserRequest = Joi.object({
    body: body
});

export const getAllUsersRequest = Joi.object({
    query: query
});

export const deleteUserRequest = Joi.object({
    params
});

export const patchUserRequest = Joi.object({
    body,
    params
});
