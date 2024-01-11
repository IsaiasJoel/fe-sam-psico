export interface NavigationItem {
    id?: string;
    title?: string;
    type: 'basico' | 'colapsable' | 'grupo';
    link?: string;
    icon?: string;
    children?: NavigationItem[];
    numeroOrden?: number;
    idPadre?: string;
}
