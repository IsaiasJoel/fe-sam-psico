export interface DTOMenuNavegacion {
    id?: string;
    title?: string;
    type: 'basico' | 'colapsable' | 'grupo';
    link?: string;
    icon?: string;
    hidden?: boolean;
    children?: DTOMenuNavegacion[];
    numeroOrden?: number;
    idPadre?: string;
}