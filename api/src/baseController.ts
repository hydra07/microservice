import { Request, Response } from "express";
import { ObjectLiteral } from "typeorm";
import BaseService from './baseService';

export class BaseController<ENTITY extends ObjectLiteral> {
  protected service: BaseService<ENTITY>;

  constructor(service: BaseService<ENTITY>) {
    this.service = service;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const entity = req.body;
      const savedEntity = await this.service.save(entity);
      return res.status(201).json(savedEntity);
    } catch (error) {
      console.error("Error creating entity:", error);
      return res.status(500).json({ error: "Error creating entity" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const data = req.body;
      const options = { where: { id: parseInt(id) } } as any;
      const updatedEntity = await this.service.update(options, data);
      if (!updatedEntity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      return res.status(200).json(updatedEntity);
    } catch (error) {
      console.error("Error updating entity:", error);
      return res.status(500).json({ error: "Error updating entity" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const options = { where: { id: parseInt(id) } } as any;
      const deletedEntity = await this.service.delete(options);
      if (!deletedEntity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      return res.status(200).json(deletedEntity);
    } catch (error) {
      console.error("Error deleting entity:", error);
      return res.status(500).json({ error: "Error deleting entity" });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const entities = await this.service.getAll();
      return res.status(200).json(entities);
    } catch (error) {
      console.error("Error getting entities:", error);
      return res.status(500).json({ error: "Error getting entities" });
    }
  }

  async getSingle(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const options = { where: { id: parseInt(id) } } as any;
      const entity = await this.service.getSingle(options);
      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      return res.status(200).json(entity);
    } catch (error) {
      console.error("Error getting entity:", error);
      return res.status(500).json({ error: "Error getting entity" });
    }
  }

  async paginate(req: Request, res: Response): Promise<Response> {
    try {
        console.log('page', req.query.page, 'limit', req.query.limit, 'keyword', req.query.keyword, 'fieldName', req.query.fieldName);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const keyword = req.query.keyword as string;
      const fieldName = req.query.fieldName as string;
      let result;
      if (keyword && fieldName) {
        result = await this.service.findAndPaginate(page, limit, keyword, fieldName);
      } else {
        result = await this.service.getAllAndPaginate(page, limit);
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error paginating entities:", error);
      return res.status(500).json({ error: "Error paginating entities" });
    }
  }

  async findAndPaginate(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const keyword = req.query.keyword as string;
      const fieldName = req.query.fieldName as string;
      const result = await this.service.findAndPaginate(page, limit, keyword, fieldName);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error finding and paginating entities:", error);
      return res.status(500).json({ error: "Error finding and paginating entities" });
    }
  }
}
