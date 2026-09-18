import { UsuarioResponseDto } from "../../usuarios/dto/response-usuario.dto";

export class LoginResponseDto {
    token: string;
    usuario: UsuarioResponseDto;


    constructor(token: string, usuario: UsuarioResponseDto) {
        this.token = token;
        this.usuario = usuario;
    }
}