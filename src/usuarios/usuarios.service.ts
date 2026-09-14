import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.js';
import { NotFoundError } from 'rxjs';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UsuarioUpdateDto } from './dto/update-usuario.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class UsuariosService {

    private usuarios: Usuario[] = [];

    private proximoId = 1;

    cadastrar(dados: CreateUsuarioDto): void {



        const novoUsuario: Usuario = {
            id: this.proximoId++,
            ...dados
        }

        this.usuarios.push(novoUsuario)
    }

    async listar() {
        return await db.orm.public.Usuario.all();
    }

    buscarPorId(id: number): Usuario | undefined {
        const user = this.usuarios.find(user => user.id === id);

        return user;
    }

    atualizar(id: number, usuario: UsuarioUpdateDto): boolean {

        const index = this.usuarios.findIndex(user => user.id === id)

        // if (index === -1) {
        //     return false;
        // }

        if (index === -1) {
            throw new NotFoundException("Usuario não encontrado")
        }

        const atualizar = {
            ...this.usuarios[index],
            ...usuario
        }

        this.usuarios[index] = atualizar;

        return true;
    }

    delete(id: number): boolean {
        const index = this.usuarios.findIndex(user => user.id === id);

        if (index === -1) {
            throw new NotFoundException("Usuario não encontrado")
        }

        this.usuarios.splice(index, 1)
        return true;
    }

}
