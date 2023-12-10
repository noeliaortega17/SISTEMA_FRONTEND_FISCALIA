import { Cargo } from "./Cargo";
import { Person } from "./Person";
import { Unidad } from "./Unidad";

export class Funcionario {
    activo:              boolean | null = null;
    fecha_creacion:      string | null = null;
    fecha_modificacion:  string | null = null;
    fecha_eliminacion:   string | null = null;
    usuario_creacion:    number | null = null;
    usuario_modificaion: number | null = null;
    usuario_eliminacion: number | null = null;
    id: number | null = null;
    idPersona: Person | null = null;
    idCargo: Cargo | null = null;
    idUnidad: Unidad | null = null;
}