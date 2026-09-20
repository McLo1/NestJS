import { Request } from "express";
import { JwtPayload } from "../interfaces/jwtPayload.interface";

export type RequestComUsuario = Request & {
    usuario?: JwtPayload
}