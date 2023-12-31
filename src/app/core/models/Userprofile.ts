import { Perfil } from "./Perfil";
import { User } from "./User";

export class Userprofile  {
    activo:              boolean | null = null;
    fecha_creacion:      string | null = null;
    fecha_modificacion:  string | null = null;
    fecha_eliminacion:   string | null = null;
    usuario_creacion:    number | null = null;
    usuario_modificaion: number | null = null;
    usuario_eliminacion: number | null = null;
    id:                  number | null = null;
    idUsuario:           User | null = null;
    idPerfil:            Perfil | null = null;
}
