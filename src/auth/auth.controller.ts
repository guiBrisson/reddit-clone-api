import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginBody: LoginUserDto) {
        return this.authService.login(loginBody);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerBody: CreateUserDto) {
        return this.authService.create(registerBody);
    }

}
