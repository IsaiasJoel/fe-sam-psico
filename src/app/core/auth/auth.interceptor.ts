import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    toastrTimeOut = { timeOut: 0 };

    constructor(
        private _authService: AuthService,
        private _toastrService: ToastrService,
        private _router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenEstaVencido: boolean = this._authService.tokenVencido;

        if (tokenEstaVencido) {
            return throwError(() => {
                this._authService.cerrarSesion();
                this._router.navigate(['iniciar-sesion'])
                this._toastrService.warning('Por favor ingrese nuevamente', 'Su sesión expiró');
            });
        }

        return next.handle(request)
            .pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        this._toastrService.error(event.body.errorMessage, 'Error', this.toastrTimeOut);
                        throw new Error(event.body.errorMessage);
                    }
                }
            })).pipe(catchError((err: HttpErrorResponse) => {
                this._toastrService.error(err.error.message.ERROR, 'Error', this.toastrTimeOut);
                return throwError(() => err);
            }));
    }
}

