import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';
import { UsuarioResponseDto } from '../usuarios/dto/response-usuario.dto.js';
import { JwtService } from '@nestjs/jwt'
import { LoginResponseDto } from './dto/login-response.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    async login(dados: LoginDto): Promise<LoginResponseDto> {

        const usuarioExistente = await db.orm.public.Usuario.where({ email: dados.email }).first();
        if (!usuarioExistente) throw new UnauthorizedException("Credenciais inválidas");

        const senhaCorreta = await bcrypt.compare(dados.senha, usuarioExistente.senhaHash);
        if (!senhaCorreta) throw new UnauthorizedException("Credenciais inválidas");

        const payload = {
            sub: usuarioExistente.id,
            email: usuarioExistente.email,
            role: usuarioExistente.role
        }

        const token = await this.jwtService.signAsync(payload);

        return new LoginResponseDto(token, new UsuarioResponseDto(usuarioExistente));
    }
}
