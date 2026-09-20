import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwtPayload.interface";
import type { RequestComUsuario } from "./types/requestComUsuario.interface.js";


@Injectable()
export class AuthGuard implements CanActivate {

    private readonly jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestComUsuario>();
        const authorization = request.headers.authorization;
        if (!authorization) throw new UnauthorizedException("Token não fornecido");

        const [tipo, token] = authorization.split(" ");
        if (tipo !== "Bearer" || !token) throw new UnauthorizedException("Token inválido");


        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
            request.usuario = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException("Token inválido");
        }

    }
}