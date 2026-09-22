import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UsuarioUpdateDto } from './dto/update-usuario.dto.js';
import { UsuarioResponseDto } from './dto/response-usuario.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Req } from '@nestjs/common';
import type { RequestComUsuario } from '../auth/types/requestComUsuario.interface.js';
import { UsuarioAtual } from '../auth/decorators/usuario-atual.decorator.js';
import type { JwtPayload } from '../auth/interfaces/jwtPayload.interface.js';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuarioservice: UsuariosService) { }

    @UseGuards(AuthGuard)
    @Get()
    listar(@UsuarioAtual() usuario: JwtPayload): Promise<UsuarioResponseDto[]> {
        console.log(usuario);
        return this.usuarioservice.listar();
    }

    @Post()
    async cadastrar(@Body() usuario: CreateUsuarioDto): Promise<UsuarioResponseDto> {
        return await this.usuarioservice.cadastrar(usuario);
    }

    @Get(':id')
    async buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<UsuarioResponseDto> {
        const user = await this.usuarioservice.buscarPorId(id)

        if (!user) {
            throw new NotFoundException("Usuario não encontrado")
        }

        return user
    }

    @Patch(':id')
    async atualizar(@Param('id', ParseIntPipe) id: number, @Body() usuario: UsuarioUpdateDto): Promise<UsuarioResponseDto> {

        return await this.usuarioservice.atualizar(id, usuario);

    }

    @Delete(':id')
    async remover(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioservice.delete(id);
    }


}
