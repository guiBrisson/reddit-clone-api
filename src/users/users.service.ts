import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.password = createUserDto.password;

        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ 
            where: {
                id: id,
            }
         });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
