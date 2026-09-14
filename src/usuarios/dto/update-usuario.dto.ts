import { IsOptional, IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator'
import { Role } from "../usuario.js";
import { Transform } from 'class-transformer';

export class UsuarioUpdateDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value)
    @IsOptional()
    @IsString({ message: 'O nome deve ser uma string' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome?: string;

    @IsOptional()
    @IsEmail({}, { message: 'O email deve ser valido' })
    email?: string;

    @IsOptional()
    @IsEnum(Role, { message: 'O Papel deve ser um admin ou membro' })
    role?: Role
}