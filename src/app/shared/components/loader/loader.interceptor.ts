import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(
        private _loaderService: LoaderService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Set the loading status to true
        this._loaderService.show();

        return next.handle(req).pipe(
            catchError(err => {
                console.log('hubo un error');

                this._loaderService.hide();
                return throwError(() => err);
            }),
            finalize(() => {
                // Set the status to false if there are any errors or the request is completed
                this._loaderService.hide();
            }));
    }
}

