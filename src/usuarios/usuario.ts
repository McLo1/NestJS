export interface Usuario {
    id: number;
    nome: string;
    email: string;
    role: Role;
};

export enum Role {
    ADMIN = "ADMIN",
    MEMBRO = "MEMBRO",
};