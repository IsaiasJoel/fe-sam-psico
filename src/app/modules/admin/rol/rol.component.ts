import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RolService } from './rol.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { DTORolListar } from './rol.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { MenuService } from '../menu/menu.service';
import { DTOMenuMatchPorCodigoRol } from '../menu/menu.model';
import { RolMenuService } from './rol-menu.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolComponent {
  //=====================================
  // Variables
  //=====================================
  filtroNombre: string;
  roles: DTORolListar[] = [];
  accion: 'crear' | 'editar' | 'ninguno' = 'ninguno';
  form: FormGroup;
  menuesPorRol: DTOMenuMatchPorCodigoRol[] = [];

  //=====================================
  // Ciclo de vida
  //=====================================
  constructor(
    private _rolService: RolService,
    private _changeDetector: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _sweetAlertService: SweetAlertService,
    private _menuService: MenuService,
    private _rolMenuService: RolMenuService
  ) { }

  ngOnInit() {
    this._crearFormulario();
    this._obtenerRoles();
    this._suscribirseALosMenues();
  }

  //=====================================
  // Métodos privados
  //=====================================
  private _suscribirseALosMenues() {
    this._rolMenuService.menues$
      .subscribe((data: string[]) => {
        this.form.patchValue({ menues: data });
        console.log('menues -> ', this.form.get('menues').value);
        this._changeDetector.markForCheck();
      });
  }

  private async _obtenerRoles() {
    const http$ = this._rolService.listar$(this.filtroNombre);
    this.roles = await lastValueFrom(http$);
    this._changeDetector.markForCheck();
  }

  private async _obtenerMenuesPorRol(idRol?: number) {
    const http$ = this._menuService.listarPorRol$(idRol);
    this.menuesPorRol = await lastValueFrom(http$);
    this._changeDetector.markForCheck();
  }

  private _crearFormulario() {
    this.form = this._formBuilder.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      habilitado: [true, []],
      menues: [[], []]
    });
  }

  private async _crear() {
    if (this.form.get('habilitado').value == null) {
      this.form.get('habilitado').setValue(true);
    }
    const http$ = this._rolService.crear$(this.form.value);
    await lastValueFrom(http$);
  }

  private async _editar() {
    const http$ = this._rolService.editar$(this.form.value);
    await lastValueFrom(http$);
  }

  //=====================================
  // Métodos públicos
  //=====================================
  filtrar(event: KeyboardEvent) {
    if (event.key != 'Enter') return;
    this._obtenerRoles();
  }

  async procesarSolicitud() {
     this._sweetAlertService.preguntarSiNo('¿Desea agregar un nuevo rol?')
      .then(async respuesta => {
        if (respuesta.isConfirmed) {
          (this.accion == 'crear') ? await this._crear() : await this._editar();
          await this._obtenerRoles();
          this.accion = 'ninguno';
        }
      });
  }

  async ver(id: number) {
    this.accion = 'editar';
    const httpRol$ = this._rolService.ver$(id);
    const httpMenuesPorRol$ = this._menuService.listarPorRol$(id);

    forkJoin({
      rol: httpRol$, menuesPorRol: httpMenuesPorRol$
    }).subscribe(data => {
      this.form.patchValue(data.rol);
      this.menuesPorRol = data.menuesPorRol;
      this._changeDetector.markForCheck();
    });
  }

  async crear() {
    this.accion = 'crear';
    this.form.reset();
    this._obtenerMenuesPorRol();
  }

  cancelar() {
    this.accion = 'ninguno';
    this.form.reset();
    this.menuesPorRol = [];
  }

  agregarAListaParaEnviar(codigo: string, codigoPadre: string) {
    this._rolMenuService.menues = { codigo, codigoPadre };
  }
}