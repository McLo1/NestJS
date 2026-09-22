import {
    createParamDecorator
} from "@nestjs/common";

export const UsuarioAtual = createParamDecorator(
    (_, context) => {
        const request = context.switchToHttp().getRequest();
        return request.usuario;
    }
);