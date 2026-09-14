export interface Usuario {
    id: number;
    nome: string;
    email: string;
    role: Role;
};

export const Role = {
    ADMIN: 'ADMIN',
    MEMBRO: 'MEMBRO',
} as const;

export type Role = typeof Role[keyof typeof Role];