import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
    ],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,   
        },
    ],
    controllers: [AuthController],
    exports: []
})
export class AuthModule { }