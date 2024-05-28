import http from "./http";
import { CategoryProduct } from "CustomTypes";

class CategoryProductService {
    async fetchData() {
        return http.get("/api/categoryProduct")
                    .then(res => {
                        if(res.data){
                            return res.data as CategoryProduct[];
                        }
                    })
    }
}

export default new CategoryProductService();