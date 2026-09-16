import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsString({ message: "O campo email deve ser uma string" })
    @IsEmail({}, { message: "O campo email deve ser um email válido" })
    email: string;

    @IsString({ message: "O campo senha deve ser uma string" })
    @IsNotEmpty({ message: "O campo senha não pode ser vazio" })
    senha: string;

}