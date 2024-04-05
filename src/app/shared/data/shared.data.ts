import { OpcionesComboSexo } from "../models/shared.models";

export const OPCIONES_SEXO: OpcionesComboSexo[] = [
    { codigo: 'H', nombre: 'Hombre' },
    { codigo: 'M', nombre: 'Mujer' },
    { codigo: 'NB', nombre: 'No binario' },
    { codigo: 'NN', nombre: 'Prefiere no decirlo' }
];

export const NACIONALIDADES: string[] = ['PERU', 'VENEZUELA', 'COLOMBIA', 'ECUADOR'];

export const SERVICIOS_BASICOS: string[] = ['LUZ', 'AGUA', 'DESAGUE', 'RECARGA DE TELEFONO'];

export const TEXTO_SELECCIONE: string = 'SELECCIONE';
export const CONSULTA_CORRECTA: string = 'La consulta se ejecutó correctamente';

//===================================================
// VARIABLES EN LOCAL STORAGE
//===================================================
export const MENUES: string = "SAM-MENUES";
export const TOKEN_NAME: string = "SAM-jwtToken";
export const USUARIO: string = "SAM-USUARIO";