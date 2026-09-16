import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsuarioResponseDto } from '../usuarios/dto/response-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('login')
    async login(@Body() dados: LoginDto): Promise<UsuarioResponseDto> {
        return this.authService.login(dados);
    }

}
