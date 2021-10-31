import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

miFormulario:FormGroup = this.fb.group({
  nombre: [ '', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ] ],
  email: [ '', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ this.emailValidatorService ] ],
  username: [ '', [ Validators.required, this.validatorService.noPuedeSerRat ] ],
  password: [ '', [ Validators.required, Validators.minLength(6) ] ],
  password2: [ '', [ Validators.required,  ] ],

},{
  validators: [ this.validatorService.camposIguales( 'password', 'password2' ) ]
})


  get emailErrorMsg():string{

    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'Email es obligatorio';
    }else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de email';
    } else if (errors?.emailTomado) {
      return 'El email ya existe';
    }
    return '';
  }

  constructor( private fb:FormBuilder, private validatorService:ValidatorService ,private emailValidatorService:EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'FelixJ Arteaga',
      email:'test1@test.com',
      username:'farteaga',
      password:'123456',
      password2:'123456'
    })
  }

  campoNoValido( campo:string ){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  // }

  //  emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.emailTomado && this.miFormulario.get('email')?.touched;
  // }


  sumbitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
    
  }

}
