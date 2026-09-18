import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { UsuarioResponseDto } from '../usuarios/dto/response-usuario.dto';
import { LoginResponseDto } from './dto/login-response.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('login')
    async login(@Body() dados: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(dados);
    }

}
