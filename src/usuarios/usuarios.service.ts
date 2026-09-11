import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.js';
import { NotFoundError } from 'rxjs';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';

@Injectable()
export class UsuariosService {

    private usuarios: Usuario[] = [];

    private proximoId = 1;

    cadastrar(dados: CreateUsuarioDto): void {



        const novoUsuario: Usuario = {
            id: this.proximoId + 1,
            ...dados
        }

        this.usuarios.push(novoUsuario)
    }

    listar(): Usuario[] {
        return this.usuarios;
    }

    buscarPorId(id: number): Usuario | undefined {
        const user = this.usuarios.find(user => user.id === id);

        return user;
    }

    atualizar(id: number, usuario: Partial<Usuario>): boolean {

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
