import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException, Patch, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service.js';
import type { Usuario } from './usuario.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuarioservice: UsuariosService) { }

    @Get()
    listar(): Usuario[] {
        return this.usuarioservice.listar();
    }

    @Post()
    cadastrar(@Body() usuario: CreateUsuarioDto): void {
        this.usuarioservice.cadastrar(usuario);
    }

    @Get(':id')
    buscarPorId(@Param('id', ParseIntPipe) id: number): Usuario | undefined {
        const user = this.usuarioservice.buscarPorId(id)

        if (!user) {
            throw new NotFoundException("Usuario não encontrado")
        }

        return user
    }

    @Patch(':id')
    atualizar(@Param('id', ParseIntPipe) id: number, @Body() usuario: Partial<Usuario>): boolean {

        this.usuarioservice.atualizar(id, usuario)

        return this.usuarioservice.atualizar(id, usuario);

    }

    @Delete(':id')
    remover(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioservice.delete(id);
    }


}
