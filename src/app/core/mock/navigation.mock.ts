import { DTOMenuNavegacion } from "src/app/modules/admin/menu/menu.model";

export const MockNavigationMenues: DTOMenuNavegacion[] = [
    { id: 'ME001', type: 'basico', title: 'Inicio', icon: 'home', link: 'inicio' },
    { id: 'ME002', type: 'basico', title: 'Dashboard', icon: 'monitor-dashboard', link: 'dashboard' },
    { id: 'ME003', type: 'basico', title: 'Pacientes', icon: 'account-heart', link: 'pacientes' },
    { id: 'ME003', type: 'basico', title: 'Usuarios', icon: 'account', link: 'usuarios' },
    { id: 'ME003', type: 'basico', title: 'Atención', icon: 'account-child', link: 'atenciones' },
    { id: 'ME003', type: 'basico', title: 'Servicios', icon: 'clipboard-text', link: 'servicios' },
    { id: 'ME003', type: 'basico', title: 'Administración', icon: 'security', link: 'administracion' }
];