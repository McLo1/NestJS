import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "../usuario.js";

export class CreateUsuarioDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    nome: string;

    @IsEmail({}, { message: 'E-mail inválido.' })
    email: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    senhaHash: string;

    @IsEnum(Role, { message: 'O papel deve ser um admin ou membro.' })
    role: Role
}