import { Injectable } from '@angular/core';
import { ReplaySubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechaService {
  // -----------------------------------------------------------------------------------------------------
  // @ Variables
  // -----------------------------------------------------------------------------------------------------
  private _anioActual = new Date().getFullYear();
  private _anioInicio = this._anioActual - 100; // Considerando un rango de edad de hasta 100 años
  private _anioFin = this._anioActual; // Estoy considerando límite de fecha como la fecha actual

  /**
   * en el contexto de Array.from, la expresión (_, index) significa que la función de mapeo acepta dos parámetros, pero el primero (representado por _) no se utiliza dentro de la función. El segundo parámetro (index) es el índice del elemento en el objeto iterable.
   */
  private _dias: number[] = Array.from({ length: 31 }, (_, index) => index + 1); //del 1 al 31
  private _meses: Mes[] = [
    { ordinal: 1, nombre: 'Enero' }, { ordinal: 2, nombre: 'Febrero' },
    { ordinal: 3, nombre: 'Marzo' }, { ordinal: 4, nombre: 'Abril' },
    { ordinal: 5, nombre: 'Mayo' }, { ordinal: 6, nombre: 'Junio' },
    { ordinal: 7, nombre: 'Julio' }, { ordinal: 8, nombre: 'Agosto' },
    { ordinal: 9, nombre: 'Septiembre' }, { ordinal: 10, nombre: 'Octubre' },
    { ordinal: 11, nombre: 'Noviembre' }, { ordinal: 12, nombre: 'Diciembre' }
  ];
  private _anios: number[] = Array.from({ length: this._anioFin - this._anioInicio + 1 }, (_, index) => this._anioInicio + index).sort((a, b) => b - a);;

  private _fechaSeleccionada: ReplaySubject<string> = new ReplaySubject<string>;
  private _dia: number;
  private _mes: Mes;
  private _anio: number;

  get controlesFecha(): ControlFecha {
    return {
      dias: this._dias,
      meses: this._meses,
      anios: this._anios
    }
  }

  get fechaSeleccionada$() {
    return this._fechaSeleccionada.asObservable();
  }

  set dia(dia: number) {
    this._dia = dia;
    this._procesarFecha();
  }

  set mes(mes: Mes) {
    this._mes = mes;
    this._procesarFecha();
  }

  set anio(anio: number) {
    this._anio = anio;
    this._procesarFecha();
  }

  constructor() { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _esFechaValida(): boolean {
    if (!this._anio || !this._mes || !this._dia) {
      return false;
    }
    const fecha: string = `${this._anio}-${this._mes.ordinal}-${this._dia}`;
    const fechaFormateada = new Date(fecha);
    return !isNaN(fechaFormateada.getTime());
  }

  private _procesarFecha() {
    if (this._esFechaValida()) {
      const fecha: string = `${this._anio}-${this._mes.ordinal}-${this._dia}`;
      this._fechaSeleccionada.next(fecha);
    } else {
      this._fechaSeleccionada.next(null);
    }
  }
}

export interface ControlFecha {
  dias: number[];
  meses: Mes[];
  anios: number[];
}

export interface Mes {
  ordinal: number;
  nombre: string;
}