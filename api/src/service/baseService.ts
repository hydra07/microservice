// src/service/baseService.ts
import {
  DeepPartial,
  EntityTarget,
  FindOneOptions,
  ILike,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { PostgresDataSource } from "../config/db.config";
import handleError from "../util/handleError";
import { PaginatedResult } from "../@types/user";

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
      handleError(error as Error, "Error saving entity");
    }
  }

  public async delete(options: FindOneOptions<ENTITY>): Promise<ENTITY | null> {
    try {
      const entity = await this.repository.findOne(options);
      if (entity) {
        await this.repository.remove(entity);
      }
      return entity;
    } catch (error) {
      return handleError(error as Error, "Error deleting entity");
    }
  }

  // public async update(
  //   options: FindOneOptions<ENTITY>,
  //   data: Partial<ENTITY>
  // ): Promise<ENTITY | null> {
  //   try {
  //     const entity = await this.repository.findOne(options);
  //     if (!entity) {
  //       return null;
  //     }

  //     Object.assign(entity, data);
  //     const updatedEntity = await this.repository.save(entity);
  //     return updatedEntity;
  //   } catch (error) {
  //     return handleError(error as Error, "Error updating entity");
  //   }
  // }
  public async update(
    options: FindOneOptions<ENTITY>,
    data: DeepPartial<ENTITY>
  ): Promise<ENTITY | null> {
    try {
      const entity = await this.repository.findOne(options);
      if (!entity) {
        // throw new Error('Entity not found');
        return null;
      }

      const updatedEntity = this.repository.merge(entity, data);
      const savedEntity = await this.repository.save(updatedEntity);
      return savedEntity;
    } catch (error) {
      return handleError(error as Error, "Error updating entity");
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
      return handleError(error as Error, "Error finding by keyword");
    }
  }

  async getAll() {
    try {
      return await this.repository.find();
    } catch (error) {
      // Handle error accordingly
      return handleError(error as Error, "Error getting all entities");
    }
  }

  async getSingle(options: FindOneOptions<ENTITY>) {
    try {
      return await this.repository.findOne(options);
    } catch (error) {
      // Handle error accordingly
      return handleError(error as Error, "Error getting single entity");
    }
  }

  async findAll(options: FindOneOptions<ENTITY>) {
    try {
      return await this.repository.find(options);
    } catch (error) {
      return handleError(error as Error, "Error find entities");
    }
  }

  async getAllAndPaginate(
    page: number,
    limit: number,
    options: FindOneOptions<ENTITY> = {}
  ): Promise<PaginatedResult<ENTITY>> {
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
      return handleError(
        error as Error,
        "Error getting all and paginating entities"
      );
    }
  }

  async findAndPaginate(
    page: number,
    limit: number,
    keyword: string,
    fieldName: keyof ENTITY
  ): Promise<PaginatedResult<ENTITY>> {
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
      return handleError(
        error as Error,
        "Error finding and paginating entities"
      );
    }
  }

  async findByOptions(options: FindOneOptions<ENTITY>) {
    try {
      return await this.repository.find(options);
    } catch (error) {
      return handleError(error as Error, "Error finding by options");
    }
  }
}
