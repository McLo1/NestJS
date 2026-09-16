import { Role } from "../usuario"

export class UsuarioResponseDto {
    id: number;
    nome: string;
    email: string;
    role: Role;

    constructor(usuario: {
        id: number;
        nome: string;
        email: string;
        role: Role;
    }) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.role = usuario.role;
    }
}

