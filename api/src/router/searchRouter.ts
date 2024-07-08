import { SearchController } from "@/controller/searchController";
import { Router } from "express";

const searchRouter = Router();
const searchController = new SearchController();

searchRouter.get("/search", searchController.searchByKeyword.bind(searchController));

export default searchRouter;