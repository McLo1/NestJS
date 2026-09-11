import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../usuario.js";

export class UsuarioUpdateDto {
    @IsOptional()
    @IsString({ message: 'O nome deve ser uma string' })
    nome?: string;

    @IsOptional()
    @IsEmail({}, { message: 'O email deve ser valido' })
    email?: string;

    @IsOptional()
    @IsEnum(Role, { message: 'O Papel deve ser um admin ou membro' })
    role?: Role
}