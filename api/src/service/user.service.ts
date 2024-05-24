import {PostgresDataSource} from "../config/db.config";
import { User } from "../entity/user.entity";

class UserService {
    private userRepository = PostgresDataSource.getRepository(User);


    //save user
    async saveUser(user: User) {
        return await this.userRepository.save(user);
    }

    //find user by id
    async findUserById(id: string){
        console.log('sss',id)
        return await this.userRepository.findOneBy({id: id});
    }
   
}

export default UserService;