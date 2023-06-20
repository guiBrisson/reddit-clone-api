import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./roles/roles.guard";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UsersService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    controllers: [UsersController],
    exports: [TypeOrmModule, UsersService] // Exporting TypeOrmModule to use the User repository outside of this module.
})
export class UsersModule { }