import { IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "../usuario.js";

export class CreateUsuarioDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    nome: string;

    @IsEmail({}, { message: 'E-mail inválido.' })
    email: string;

    @IsEnum(Role, { message: 'O papel deve ser um admin ou membro.' })
    role: Role
}