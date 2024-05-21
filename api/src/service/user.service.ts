import { ObjectId } from "mongodb";
import AppDataSource from "../config/db.config";
import { User } from "../entity/user.entity";

class UserService {
    private userRepository = AppDataSource.getRepository(User);
   
}

export default UserService;