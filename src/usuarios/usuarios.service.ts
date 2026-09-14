import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UsuarioUpdateDto } from './dto/update-usuario.dto.js';
import { db } from '../prisma/db.js';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsuariosService {


    async cadastrar(dados: CreateUsuarioDto): Promise<Usuario> {

        const usuarioExistente = await db.orm.public.Usuario.where({ email: dados.email }).first();

        if (usuarioExistente) {
            throw new ConflictException("Usuario já existe")
        }

        const HashSenha = await bcrypt.hash(dados.senhaHash, 10);

        const novoUsuario = await db.orm.public.Usuario.create({
            nome: dados.nome,
            email: dados.email,
            senhaHash: HashSenha,
            role: dados.role,
        });

        return novoUsuario;
    }

    async listar() {
        return await db.orm.public.Usuario.all();
    }

    async buscarPorId(id: number): Promise<Usuario | null> {

        const usuario = await db.orm.public.Usuario.
            where({ id })
            .first();

        return usuario;
    }

    async atualizar(id: number, usuario: UsuarioUpdateDto): Promise<Usuario> {

        const usuarioExistente = await db.orm.public.Usuario
            .where({ id })
            .first();

        if (!usuarioExistente) {
            throw new NotFoundException("Usuario não encontrado")
        }

        const usuarioupdate = await db.orm.public.Usuario.where({ id }).update({
            ...(usuario.nome !== undefined && { nome: usuario.nome }),
            ...(usuario.email !== undefined && { email: usuario.email }),
            ...(usuario.role !== undefined && { role: usuario.role }),
        });

        if (!usuarioupdate) {
            throw new NotFoundException("Usuario não encontrado")
        }

        return usuarioupdate;
    }

    async delete(id: number): Promise<Usuario> {
        const usuarioDelete = await db.orm.public.Usuario.where({ id }).delete();

        if (!usuarioDelete) {
            throw new NotFoundException("Usuario não encontrado")
        }

        return usuarioDelete;
    }

}
