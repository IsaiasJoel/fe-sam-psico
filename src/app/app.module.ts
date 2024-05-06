import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { environment } from 'src/environments/environment.dev';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/guards/auth.interceptor';
import { MaterialModule } from './core/modules/material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { LayoutComponent } from './layout/layout.component';
import { BasicNavigationComponent } from './layout/basic-navigation/basic-navigation.component';
import { CollapsableNavigationComponent } from './layout/collapsable-navigation/collapsable-navigation.component';
import { NgxMaskModule } from 'ngx-mask';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';
import { LoaderInterceptor } from './shared/components/loader/loader.interceptor';
import { GroupNavigationComponent } from './layout/group-navigation/group-navigation.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BasicNavigationComponent,
    CollapsableNavigationComponent,
    GroupNavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    HttpClientModule,
    MatIconModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080', 'sampsi.azurewebsites.net'],
        disallowedRoutes: [
          `http://${environment.HOST.substring(7)}/login/`
        ],
      },
    }),

    NgxMaskModule.forRoot(),
    SharedModule
  ],
  providers: [
    // Interceptores
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

    // Mat Dialog
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true } },

    //Mat input
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
