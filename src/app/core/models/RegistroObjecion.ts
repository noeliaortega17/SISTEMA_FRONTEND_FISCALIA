import { Funcionario } from "./Funcionario";
import { Tipoobjecion } from "./Tipoobjecion";

export class RegistroObjecion  {
    activo:              boolean | null = null;
    fecha_creacion:      string | null = null;
    fecha_modificacion:  string | null = null;
    fecha_eliminacion:   string | null = null;
    usuario_creacion:    number | null = null;
    usuario_modificaion: number | null = null;
    usuario_eliminacion: number | null = null;
    id:                  number | null = null;
    idTipoObjecion:      Tipoobjecion | null = null;
    idFuncionario:       Funcionario | null = null;
    numeroResolucion:    number | null = null;
    cud:                 number | null = null;
}
