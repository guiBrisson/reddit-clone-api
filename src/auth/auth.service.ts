import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        private jwtService: JwtService,
    ) { }


    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(loginUserDto.email)
        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }
        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isMatch) {
            throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: user.id, username: user.username }
        const token = await this.jwtService.signAsync(payload)

        return { token };
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(createUserDto.email);
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const newUser = new User();
        newUser.email = createUserDto.email;
        newUser.username = createUserDto.username;
        newUser.password = createUserDto.password;

        const { password, ...userResponse } = await this.usersRepository.save(newUser);
        const payload = { sub: newUser.id, username: newUser.username }
        const token = await this.jwtService.signAsync(payload)

        return { token, userResponse };
    }

}
