import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario:FormGroup = this.fb.group({ 
    nombre: [  , [Validators.required,Validators.minLength(3)] ],
    favoritos: this.fb.array( [
      [ 'Metal Gear',Validators.required ],
      ['FIFA',Validators.required]
    ],Validators.required )
  });

  nuevoFavorito:FormControl = this.fb.control( '',Validators.required )

  get favoritosArray(){
    return this.miFormulario.get( 'favoritos' ) as FormArray;
  }

  constructor( private fb:FormBuilder ) { }

   campoNoEsValido( campo:string ){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }
  agragarFavorito(){
    if (this.nuevoFavorito.invalid) {
      return;
    }

    // this.favoritosArray.push( new FormControl( this.nuevoFavorito.value,Validators.required ) );
    this.favoritosArray.push( this.fb.control(  this.nuevoFavorito.value,Validators.required  ) );
    this.nuevoFavorito.reset();
  }

  guardar(){
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
  }

  borrar( i:number ){
    this.favoritosArray.removeAt(i);
  }



}
