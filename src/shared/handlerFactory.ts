import {PaginatedData} from "./models";
import {FilterQuery, Model, QueryOptions} from "mongoose";

export async function getAll<T>(model: Model<T>, filterQuery: FilterQuery<T>, paginationAndSortingFilterQuery: any): Promise<PaginatedData<T>>  {
    const count = await model.find(filterQuery).countDocuments();
    let query = model.find(filterQuery);

    const skip = parseInt(paginationAndSortingFilterQuery.skip, 10) || 0;
    const limit = parseInt(paginationAndSortingFilterQuery.limit, 10) || 10;
    query = query.skip(skip).limit(limit);

    if (paginationAndSortingFilterQuery.sort) {
        const sortBy = paginationAndSortingFilterQuery.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    const data = await query.exec();
    return {
        count: count,
        data: data
    }
}

export async function exists<T>(model: Model<T>, filterQuery: FilterQuery<T>): Promise<boolean>  {
    return model.exists(filterQuery);
}

export async function getOne<T>(model: Model<T>, filterQuery: FilterQuery<T>, options: QueryOptions = { lean: true }): Promise<T>  {
    return model.findOne(filterQuery, options);
}

export async function updateOne<T>(model: Model<T>, filterQuery: FilterQuery<T>, updatedFields: object, options: QueryOptions = { new: true, lean: true }): Promise<T>  {
    return model.findOneAndUpdate(filterQuery, updatedFields, options);
}

export async function deleteOne<T>(model: Model<T>, filterQuery: FilterQuery<T>): Promise<void>  {
    await model.deleteOne(filterQuery);
}
