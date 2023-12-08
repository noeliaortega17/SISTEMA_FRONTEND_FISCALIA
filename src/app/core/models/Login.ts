import { Perfil } from "./Perfil";
import { User } from "./User";

export class LoginRequest  {
    user: string | null = null;
    password: string | null = null;
}

export class LoginResponse  {
    usuario: User | null = null;
    perfil : Perfil | null = null;
}