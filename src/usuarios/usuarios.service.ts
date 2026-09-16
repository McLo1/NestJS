import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UsuarioUpdateDto } from './dto/update-usuario.dto.js';
import { db } from '../prisma/db.js';
import * as bcrypt from 'bcrypt';
import { UsuarioResponseDto } from './dto/response-usuario.dto.js';


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

        const { senhaHash: _, ...usuarioSemSenha } = novoUsuario;

        return usuarioSemSenha;
    }

    async listar(): Promise<UsuarioResponseDto[]> {
        const usuarios = await db.orm.public.Usuario.all();
        return usuarios.map(
            usuario => new UsuarioResponseDto(usuario)
        );
    }

    async buscarPorId(id: number): Promise<UsuarioResponseDto | null> {

        const usuario = await db.orm.public.Usuario.
            where({ id })
            .first();

        return usuario ? new UsuarioResponseDto(usuario) : null;
    }

    async atualizar(id: number, usuario: UsuarioUpdateDto): Promise<UsuarioResponseDto> {

        const usuarioupdate = await db.orm.public.Usuario.where({ id }).update({
            ...(usuario.nome !== undefined && { nome: usuario.nome }),
            ...(usuario.email !== undefined && { email: usuario.email }),
            ...(usuario.role !== undefined && { role: usuario.role }),
        });

        if (!usuarioupdate) {
            throw new NotFoundException("Usuario não encontrado")
        }

        return new UsuarioResponseDto(usuarioupdate);
    }

    async delete(id: number): Promise<UsuarioResponseDto> {
        const usuarioDelete = await db.orm.public.Usuario.where({ id }).delete();

        if (!usuarioDelete) {
            throw new NotFoundException("Usuario não encontrado")
        }

        return new UsuarioResponseDto(usuarioDelete);
    }

}
