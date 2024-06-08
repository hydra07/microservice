import { NextFunction, Request, Response } from "express";
import { ObjectLiteral } from "typeorm";
import BaseService from "../service/baseService";
import { stringify } from 'flatted';

export class BaseController<ENTITY extends ObjectLiteral> {
  protected service: BaseService<ENTITY>;

  constructor(service: BaseService<ENTITY>) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const entity = req.body;
      const savedEntity = await this.service.save(entity);
      res.status(201).json(savedEntity);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;
      const options = { where: { id: parseInt(id) } } as any;
      const updatedEntity = await this.service.update(options, data);
      if (!updatedEntity) {
        res.status(404).json({ error: "Entity not found" });
      } else {
        res.status(200).json(updatedEntity);
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const options = { where: { id: parseInt(id) } } as any;
      const deletedEntity = await this.service.delete(options);
      if (!deletedEntity) {
        res.status(404).json({ error: "Entity not found" });
      } else {
        res.status(200).json(deletedEntity);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const entities = await this.service.getAll();
      console.log(entities);
      res.status(200).json(entities);
    } catch (error) {
      next(error);
    }
  }

  async getSingle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const options = { where: { id: parseInt(id) } } as any;
      const entity = await this.service.getSingle(options);
      if (!entity) {
        res.status(404).json({ error: "Entity not found" });
      } else {
        res.status(200).json(entity);
      }
    } catch (error) {
      next(error);
    }
  }

  async paginate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const keyword = req.query.keyword as string;
      const fieldName = req.query.fieldName as string;
      let result;
      if (keyword && fieldName) {
        result = await this.service.findAndPaginate(page, limit, keyword, fieldName);
      } else {
        result = await this.service.getAllAndPaginate(page, limit);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findAndPaginate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const keyword = req.query.keyword as string;
      const fieldName = req.query.fieldName as string;
      const result = await this.service.findAndPaginate(page, limit, keyword, fieldName);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
