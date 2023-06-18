import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [UsersModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }