import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Role } from "../usuarios/usuario";
import { log } from "console";
import type { RequestComUsuario } from "./types/requestComUsuario.interface";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
        this.reflector = reflector;
    }

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<Role[]>('roles', context.getHandler());

        if (!roles) return true;

        const request = context.switchToHttp().getRequest<RequestComUsuario>();

        if (!request.usuario) return false;

        if (!roles.includes(request.usuario?.role)) return false;


        console.log(roles);

        return true;
    }
}