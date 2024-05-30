// src/service/baseService.ts
import {
    DeepPartial,
    EntityTarget,
    FindOneOptions,
    ILike,
    ObjectLiteral,
    Repository,
  } from "typeorm";
  import { PostgresDataSource } from "./config/db.config";
  
  export default class BaseService<ENTITY extends ObjectLiteral> {
    protected repository: Repository<ENTITY>;
  
    constructor(entity: EntityTarget<ENTITY>) {
      this.repository = PostgresDataSource.getRepository(entity);
    }
  
    async save(entity: DeepPartial<ENTITY>) {
      try {
        return await this.repository.save(entity);
      } catch (error) {
        // Handle error accordingly
        console.error("Error saving entity:", error);
        throw error;
      }
    }
  
    public async delete(options: FindOneOptions<ENTITY>): Promise<ENTITY | null> {
      try {
        const entity = await this.repository.findOne(options);
        if (!entity) {
          return null;
        }
        await this.repository.remove(entity);
        return entity;
      } catch (error) {
        // Handle error accordingly
        console.error("Error deleting entity:", error);
        throw error;
      }
    }
  
    public async update(
      options: FindOneOptions<ENTITY>,
      data: Partial<ENTITY>
    ): Promise<ENTITY | null> {
      try {
        const entity = await this.repository.findOne(options);
        if (!entity) {
          return null;
        }
        Object.assign(entity, data);
        return await this.repository.save(entity);
      } catch (error) {
        // Handle error accordingly
        console.error("Error updating entity:", error);
        throw error;
      }
    }
  
    async findByKeyword(keyword: string, fieldName: keyof ENTITY) {
      try {
        return await this.repository.find({
          where: {
            [fieldName]: ILike(`%${keyword}%`),
          } as any,
        });
      } catch (error) {
        // Handle error accordingly
        console.error("Error finding entities by keyword:", error);
        throw error;
      }
    }
  
    async getAll() {
      try {
        return await this.repository.find();
      } catch (error) {
        // Handle error accordingly
        console.error("Error getting all entities:", error);
        throw error;
      }
    }
  
    async getSingle(options: FindOneOptions<ENTITY>) {
      try {
        return await this.repository.findOne(options);
      } catch (error) {
        // Handle error accordingly
        console.error("Error getting single entity:", error);
        throw error;
      }
    }
  
    public async getAllAndPaginate(
      page: number,
      limit: number,
      options: FindOneOptions<ENTITY> = {}
    ) {
      try {
        const [entities, total] = await this.repository.findAndCount({
          ...options,
          skip: (page - 1) * limit,
          take: limit,
        });
  
        return {
          data: entities,
          page,
          limit,
          total,
          lastPage: Math.ceil(total / limit),
        };
      } catch (error) {
        // Handle error accordingly
        console.error("Error getting paginated entities:", error);
        throw error;
      }
    }
  
    async findAndPaginate(
      page: number,
      limit: number,
      keyword: string,
      fieldName: keyof ENTITY
    ) {
      try {
        const skip = (page - 1) * limit;
        const [result, total] = await this.repository.findAndCount({
          where: {
            [fieldName]: ILike(`%${keyword}%`),
          } as any,
          take: limit,
          skip,
        });
  
        return {
          data: result,
          total,
          limit,
          page,
          lastPage: Math.ceil(total / limit),
        };
      } catch (error) {
        // Handle error accordingly
        console.error("Error finding and paginating entities:", error);
        throw error;
      }
    }
  }
  