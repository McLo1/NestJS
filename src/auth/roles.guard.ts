import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../usuarios/usuario";
import { log } from "console";
import { RequestComUsuario } from "./types/requestComUsuario.interface";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
        this.reflector = reflector;
    }

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest<RequestComUsuario>();

        if (roles.includes(request.usuario?.role)) return false;

        console.log(roles);

        return true;
    }
}