import { UsuarioResponseDto } from "../../usuarios/dto/response-usuario.dto";

export class LoginResponseDto {
    token: string;
    usuario: UsuarioResponseDto;

}