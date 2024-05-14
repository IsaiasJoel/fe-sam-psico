import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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
  private _meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  private _anios: number[] = Array.from({ length: this._anioFin - this._anioInicio + 1 }, (_, index) => this._anioInicio + index).sort((a, b) => b - a);;

  private _fechaSeleccionada: ReplaySubject<string> = new ReplaySubject<string>;
  private _dia: number;
  private _mes: string;
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

  set mes(mes: string) {
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
    const fecha: string = `${this._anio}-${this._mes}-${this._dia}`;
    const fechaFormateada = new Date(fecha);
    return !isNaN(fechaFormateada.getTime());
  }

  private _procesarFecha() {
    console.log('Evaluando fecha...');
    if (this._esFechaValida()) {
      console.log('Es fecha válida');
      const fecha: string = `${this._anio}-${this._mes}-${this._dia}`;
      this._fechaSeleccionada.next(fecha);
    } else {
      console.log('NO es fecha válida');
    }
  }
}

export interface ControlFecha {
  dias: number[];
  meses: string[];
  anios: number[];
}