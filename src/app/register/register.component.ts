import { NgIf } from '@angular/common';
import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,NgIf,FloatLabelModule,InputTextModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(public AuthService:AuthService){}
  ngOnInit(){
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  registerForm:FormGroup = new FormGroup({
    // first_name: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(8)]),
    // last_name: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(8)]),
    // age: new FormControl('',[Validators.required,Validators.min(5), Validators.max(80)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(`^[A-Za-z0-9]{6,15}$`)]),
  })

  submitRegisterForm(registerForm:FormGroup){
    if(registerForm.valid){
      this.AuthService.register(registerForm.value.email,registerForm.value.password)
    }
  }
}
