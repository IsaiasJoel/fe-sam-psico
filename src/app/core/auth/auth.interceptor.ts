import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        // private _loginService: LoginService,
        private _toastrService: ToastrService,
        // private _layoutService: LayoutService,
        private _router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const tokenEstaVencido: boolean = this._loginService.tokenVencido;

        // if (tokenEstaVencido) {
        //     return throwError(() => {
        //         this._loginService.cerrarSesion();
        //         this._layoutService.vista = 'general';
        //         this._toastrService.warning('Por favor ingrese nuevamente', 'Su sesión expiró');
        //         this._router.navigate(['pages/inicio'])
        //     });
        // }

        return next.handle(request)
            .pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        this._toastrService.error(event.body.errorMessage, 'Error');
                        throw new Error(event.body.errorMessage);
                    }
                }
            })).pipe(catchError((err: HttpErrorResponse) => {
                this._toastrService.error(err.error.message.ERROR, 'Error');
                return throwError(() => err);
            }));
    }
}

