import { Search } from "@/entity/search.entity";
import { SearchService } from "@/service/searchService";
import { Request, Response } from "express";


export class SearchController {
    private searchService: SearchService<any>;

    constructor() {
        this.searchService = new SearchService(Search);
    }

    async searchByKeyword(req: Request, res: Response) {
        try {
            const { keyword, fieldName } = req.query;
            const results = await this.searchService.findByKeyword(
                keyword as string,
                fieldName as keyof any
            );
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}