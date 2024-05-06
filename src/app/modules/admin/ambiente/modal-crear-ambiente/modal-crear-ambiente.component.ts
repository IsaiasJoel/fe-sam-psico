import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AmbienteService } from '../ambiente.service';
import { lastValueFrom } from 'rxjs';
import { convertirFileABase64 } from 'src/app/utils/files.utils';

@Component({
  selector: 'app-modal-crear-ambiente',
  templateUrl: './modal-crear-ambiente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCrearAmbienteComponent {
  @ViewChild('fileInput') private _fileInput: ElementRef;
  form: FormGroup;

  //===============================================================
  // Ciclo de vida
  //===============================================================
  constructor(
    public matRef: MatDialogRef<ModalCrearAmbienteComponent>,
    private _ambienteService: AmbienteService,
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._iniciarFormulario();
  }

  //===============================================================
  // Métodos privados
  //===============================================================
  private _iniciarFormulario() {
    this.form = this._formBuilder.group({
      nombre: [null, Validators.required],
      ubicacion: [null, [Validators.required]],
      aforo: [null, [Validators.required]],
      disponible: [true, [Validators.required]],
      imagen: [null, []],
      descripcion: [null, [Validators.required]],
      habilitado: [true, [Validators.required]]
    });
  }

  //===============================================================
  // Métodos públicos
  //===============================================================
  async procesarSolicitud() {
    if (this.form.invalid) {
      //TODO: do anything
      return;
    }

    const http$ = this._ambienteService.agregar$(this.form.value);
    await lastValueFrom(http$);
    this.matRef.close('OK');
  }

  /**Procesa la imagen de portada urbanizacion */
  procesarAchivo(fileList: FileList) {
    if (!fileList.length) {
      //TODO: archivo no válido
      return;
    }

    // if (!TIPOS_IMAGEN_PERMITIDOS.includes(fileList[0].type)) {
    //   //TODO: validar tipos de imágenes permitidos
    //   return;
    // }

    const process = convertirFileABase64(fileList[0]);
    process.subscribe((base64) => {
      this.form.patchValue({ imagen: base64 });
      this._changeDetectorRef.markForCheck();
    });
  }

  eliminarImagen() {
    this.form.patchValue({ imagen: null });
    this._changeDetectorRef.markForCheck();
  }
}
