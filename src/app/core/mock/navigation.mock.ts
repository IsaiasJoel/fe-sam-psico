import { DTOMenuNavegacion } from "src/app/modules/admin/menu/menu.model";

export const MockNavigationMenues: DTOMenuNavegacion[] = [
    // Dashboards
    {
        id: 1, tipo: 'grupo', nombre: 'Dashboard', icono: '', url: '', hijos: [
            { id: 1, tipo: 'basico', nombre: 'General', icono: 'monitor-dashboard', url: 'dashboard' }
        ]
    },

    // Gestión de casos
    {
        id: 1, tipo: 'grupo', nombre: 'Gestión de casos', icono: '', url: '', hijos: [
            { id: 1, tipo: 'basico', nombre: 'Pacientes', icono: 'account-heart', url: 'pacientes' },
            { id: 1, tipo: 'basico', nombre: 'Psicologos', icono: 'account', url: 'psicologos' },
            { id: 1, tipo: 'basico', nombre: 'Atenciones', icono: 'account-child', url: 'atenciones' }
        ]
    },

    // Personal
    {
        id: 1, tipo: 'grupo', nombre: 'Personal', icono: '', url: '', hijos: [
            { id: 1, tipo: 'basico', nombre: 'Mis atenciones', icono: 'heart-pulse', url: 'mis-atenciones' },
            { id: 2, tipo: 'basico', nombre: 'Mis pacientes', icono: 'account-heart', url: 'mis-pacientes' }
        ]
    },

    //Mantenimientos
    {
        id: 1, tipo: 'grupo', nombre: 'Mantenimientos', icono: '', url: '', hijos: [
            { id: 1, tipo: 'basico', nombre: 'Servicios', icono: 'clipboard-text', url: 'servicios' },
            { id: 1, tipo: 'basico', nombre: 'Ambientes', icono: 'sofa-single', url: 'ambientes' }
        ]
    },

    // Gestión interna
    {
        id: 1, tipo: 'grupo', nombre: 'Gestión interna', icono: '', url: '', hijos: [
            { id: 1, tipo: 'basico', nombre: 'Usuarios', icono: 'account-group', url: 'usuarios' },
            { id: 1, tipo: 'basico', nombre: 'Roles', icono: 'security', url: 'roles' }
        ]
    },
];