import { Route } from '@angular/router';
import { noAuthGuard } from './core/auth/guards/no-auth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [

    // Redirect empty path to '/sign-up'
    { path: '', pathMatch: 'full', redirectTo: 'iniciar-sesion' },

    // Redirect signed-in user to the '/sign-in'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [noAuthGuard],
        // component: LayoutComponent,
        // data: {
        //     layout: 'empty'
        // },
        children: [
            // { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            // { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            // { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'iniciar-sesion', loadChildren: () => import('src/app/modules/auth/iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionModule) },
            // { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            // { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            // { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            // { path: '403', loadChildren: () => import('app/modules/landing/error-403/error-403.module').then(m => m.Error403Module) },
            // { path: '404', loadChildren: () => import('app/modules/landing/error-404/error-404.module').then(m => m.Error404Module) },
            // { path: '500', loadChildren: () => import('app/modules/landing/error-500/error-500.module').then(m => m.Error500Module) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        // resolve: {
        //     initialData: InitialDataResolver
        // },
        children: [
            { path: 'inicio', loadChildren: () => import('../app/modules/admin/inicio/inicio.module').then(m => m.InicioModule) },
            { path: 'dashboard', loadChildren: () => import('../app/modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'pacientes', loadChildren: () => import('../app/modules/admin/paciente/paciente.module').then(m => m.PacienteModule) },
            { path: 'usuarios', loadChildren: () => import('./modules/admin/usuario/usuario.module').then(m => m.UsuarioModule) },
            { path: 'atenciones', loadChildren: () => import('../app/modules/admin/atencion/atencion.module').then(m => m.AtencionModule) },
            { path: 'servicios', loadChildren: () => import('../app/modules/admin/servicio/servicio.module').then(m => m.ServicioModule) },
            { path: 'administracion', loadChildren: () => import('../app/modules/admin/administracion/administracion.module').then(m => m.AdministracionModule) },
        ]
    }
];