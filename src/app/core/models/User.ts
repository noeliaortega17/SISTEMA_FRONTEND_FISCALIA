import { Funcionario } from "./Funcionario";

export class User  {
    activo:              boolean | null = null;
    fecha_creacion:      string | null = null;
    fecha_modificacion:  string | null = null;
    fecha_eliminacion:   string | null = null;
    usuario_creacion:    number | null = null;
    usuario_modificaion: number | null = null;
    usuario_eliminacion: number | null = null;
    id:                  number | null = null;
    usuario:              string | null = null;
    contrasena:         string | null = null;
    idFuncionario:         Funcionario | null = null;
}
