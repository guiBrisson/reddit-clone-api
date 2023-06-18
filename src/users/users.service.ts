import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOneById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ 
            where: {
                id: id,
            }
         });
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {
                email: email,
            }
        })
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
