export interface DTOUsuarioListar {
    id: number;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    fechaNacimiento: string;
    carrera: string;
    especialidad: string;
    casosAsignados: number;
}

//========================================
// INTERFACES
//========================================
export interface DTOUsuarioEnSesion {
    id: string;
    apPaterno: string;
    apMaterno: String;
    nombres: string;
    roles: any[];
} 