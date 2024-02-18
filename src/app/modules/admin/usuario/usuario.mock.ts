import { DTOUsuarioListar } from "./usuario.models";

export const USUARIOS: DTOUsuarioListar[] = [
    {
        id: 1, dni: '12345678', apPaterno: 'Dominguez', apMaterno: 'Montalbán', nombres: 'Isaías Joel', fechaNacimiento: '2 de agosto de 1999', carrera: 'Ing de sistemas',
        especialidad: 'Programación', casosAsignados: 0, habilitado: true
    },
    {
        id: 2, dni: '87654321', apPaterno: 'Nevado', apMaterno: 'Sánchez', nombres: 'Luis', fechaNacimiento: '3 de enero de 1995', carrera: 'Psicología',
        especialidad: 'Traumas', casosAsignados: 2, habilitado: true
    },
    {
        id: 3, dni: '272818299', apPaterno: 'Chanta', apMaterno: 'Melendez', nombres: 'Fiorella', fechaNacimiento: '8 de octubre de 1998', carrera: 'Psicología',
        especialidad: 'Organizacional', casosAsignados: 2, habilitado: true
    },
    {
        id: 4, dni: '62771829', apPaterno: 'Horna', apMaterno: 'Chiscul', nombres: 'Marjorie', fechaNacimiento: '18 de marzo de 1995', carrera: 'Psicología',
        especialidad: 'Clínica', casosAsignados: 2, habilitado: true
    },
    {
        id: 5, dni: '617728192', apPaterno: 'Cabrera', apMaterno: 'Alvear', nombres: 'Betsabeth', fechaNacimiento: '15 de septiembre de 1995', carrera: 'Ing de sistemas',
        especialidad: 'Programación', casosAsignados: 2, habilitado: true
    },
    {
        id: 6, dni: '152729381', apPaterno: 'Peña', apMaterno: 'Flores', nombres: 'Antony', fechaNacimiento: '9 de septiembre de 1996', carrera: 'Psicología',
        especialidad: 'Poblaciones vulnerables', casosAsignados: 1, habilitado: true
    }
];