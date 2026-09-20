import type { Role } from "../../usuarios/usuario.js";

export interface JwtPayload {
    sub: number;
    email: string;
    role: Role;
    iat: number;
    exp: number;

}