import { Delito } from "./Delito";
import { Funcionario } from "./Funcionario";

export class Desarchivo{
    activo:              boolean | null = null;
    fecha_creacion:      string | null = null;
    fecha_modificacion:  string | null = null;
    fecha_eliminacion:   string | null = null;
    usuario_creacion:    number | null = null;
    usuario_modificaion: number | null = null;
    usuario_eliminacion: number | null = null;
    id:                  number | null = null;
    descripcion:         string | null = null;
    cud:                 number | null = null;
    motivo:              string | null = null;
    fecha_asignacion:    string | null = null;
    fecha_recepcion:     string | null = null;
    fecha_desarchivo:    string | null = null;
    idDelito:            Delito | null = null;
    idFuncionario:       Funcionario | null = null;
}
