import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findOne(@Query('id') id: string): Promise<any> {
        if (id == null) {
            return this.usersService.findAll();
        } else {
            return this.usersService.findOne(id);
        }
    }

    @Delete()
    deleteOne(@Query('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
