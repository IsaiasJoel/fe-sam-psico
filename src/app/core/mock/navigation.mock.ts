import { DTOMenuNavegacion } from "src/app/modules/admin/menu/menu.model";

export const MockNavigationMenues: DTOMenuNavegacion[] = [
    // { id: 'ME001', type: 'basico', title: 'Inicio', icon: 'home', url: 'inicio' },
    { id: 1, tipo: 'basico', nombre: 'Dashboard', icono: 'monitor-dashboard', url: 'dashboard' },
    { id: 1, tipo: 'basico', nombre: 'Pacientes', icono: 'account-heart', url: 'pacientes' },
    { id: 1, tipo: 'basico', nombre: 'Psicologos', icono: 'account', url: 'psicologos' },
    { id: 1, tipo: 'basico', nombre: 'Atenciones', icono: 'account-child', url: 'atenciones' },
    { id: 1, tipo: 'basico', nombre: 'Mis atenciones', icono: 'heart-pulse', url: 'mis-atenciones' },
    { id: 1, tipo: 'basico', nombre: 'Servicios', icono: 'clipboard-text', url: 'servicios' },
    { id: 1, tipo: 'basico', nombre: 'Ambientes', icono: 'sofa-single', url: 'ambientes' },
    { id: 1, tipo: 'basico', nombre: 'Usuarios', icono: 'account-group', url: 'usuarios' },
    { id: 1, tipo: 'basico', nombre: 'Roles', icono: 'security', url: 'roles' }
];