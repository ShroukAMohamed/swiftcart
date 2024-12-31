import { NgIf } from '@angular/common';
import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,NgIf,FloatLabelModule,InputTextModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  ngOnInit(){
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  constructor(public AuthService:AuthService){}
  loginForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(`^[A-Za-z0-9]{6,15}$`)]),
  })

  submitLoginForm(loginForm:FormGroup){
    console.log(loginForm.value.email)
    // this.AuthService.saveData()
    if(loginForm.valid){
      this.AuthService.login(loginForm.value.email,loginForm.value.password)
    }
  }
}
