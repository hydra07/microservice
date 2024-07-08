import { PostgresDataSource } from "@/config/db.config";
import handleError from "@/util/handleError";
import { EntityTarget, FindOneOptions, ILike, Like, ObjectLiteral, Repository } from "typeorm";

export class SearchService<ENTITY extends ObjectLiteral> {
    protected repository: Repository<ENTITY>;

    constructor(entity: EntityTarget<ENTITY>) {
        this.repository = PostgresDataSource.getRepository(entity);
    }

    async findByKeyword(keyword: string, fieldName: keyof ENTITY) {
        try {
            return await this.repository.find({
                where: {
                    name: Like(`%${keyword}%`),
                } as any,
            });
        } catch (error) {
            // Handle error accordingly
            return handleError(error as Error, "Error finding by keyword")
        }
    }
}

