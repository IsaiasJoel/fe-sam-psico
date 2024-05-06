import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _progress$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(0);

  constructor() { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accesores
  // -----------------------------------------------------------------------------------------------------
  get progress$(): Observable<number> {
    return this._progress$.asObservable();
  }

  get show$(): Observable<boolean> {
    return this._show$.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show the loading bar
   */
  show(): void {
    this._show$.next(true);
  }

  /**
   * Hide the loading bar
   */
  hide(): void {
    this._show$.next(false);
  }
}

