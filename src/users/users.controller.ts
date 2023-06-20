import { Controller, Delete, Get, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "./roles/roles.decorator";
import { Role } from "./roles/roles.enum";

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
    @Roles(Role.Moderator)
    deleteOne(@Query('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
