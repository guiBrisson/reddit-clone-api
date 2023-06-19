import { Controller, Delete, Get, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findOne(@Query('id') id: string): Promise<any> {
        if (id == null) {
            return this.usersService.findAll();
        } else {
            return this.usersService.findOneById(id);
        }
    }

    @Delete()
    deleteOne(@Query('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
