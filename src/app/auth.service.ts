import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerErrors:string=''
  loginErrors:string=''
  // userData:any = null
  token:any = new BehaviorSubject(null)
  constructor(private fireAuth:AngularFireAuth, public Router:Router , private toastr:ToastrService) {}

  ngOnInit(){
  }
  async register(email:string,password:string) {
    await this.fireAuth.createUserWithEmailAndPassword(email,password).then((res) => {
        this.registerErrors = ''
        this.Router.navigate(['login'])
        this.toastr.success('Registration completed successfully.','', {
      progressBar: true,
    });
    }).catch(error => {
      this.toastr.error('Registration failed.','', {
      progressBar: true,
    });
      console.log(error.code)
      // Handle different types of errors
      switch (error.code) {
        case 'auth/wrong-password':
          // Handle wrong password error
          this.registerErrors = 'Invalid password'
          break;
        case 'auth/weak-password':
          // Handle wrong password error
          this.registerErrors = 'weak password'
          break;
        case 'auth/user-not-found':
          // Handle user not found error
          this.registerErrors = 'User not found'
          break;
        case 'auth/email-already-in-use':
          // Handle email already in use error
          this.registerErrors = 'Email already in use'
          break;
        // Add more cases as needed
        default:
          // Handle other errors
          this.registerErrors = error.message
      }
    });
    console.log(this.registerErrors)
  }

  login(email:string,password:string) {
    this.fireAuth.signInWithEmailAndPassword(email,password).then((res) => {
      this.loginErrors = ''
      this.toastr.success('Welcome to SwiftCart','', {
      progressBar: true,
    });
      console.log(res)
      const userToken = JSON.stringify(res.user?.refreshToken)
      const email = JSON.stringify(res.user?.email)
      this.token.next(userToken)
      localStorage.setItem('userToken', userToken)
      localStorage.setItem('email', email)
      this.Router.navigate(['home'])
    }).catch(error => {
      this.toastr.error('Login failed.','', {
      progressBar: true,
    });
    // Handle different types of errors
    switch (error.code) {
      case 'auth/wrong-password':
        // Handle wrong password error
        this.loginErrors = 'Invalid password'
        break;
      case 'auth/invalid-credential':
          // Handle wrong password error
        this.loginErrors = 'Wrong email or password'
        break;
      case 'auth/user-not-found':
        // Handle user not found error
        this.loginErrors = 'User not found'
        break;
      case 'auth/email-already-in-use':
        // Handle email already in use error
        this.loginErrors = 'Email already in use'
        break;
      // Add more cases as needed
      default:
        // Handle other errors
        this.loginErrors = error.message
    }
    });
  }
  logOut(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('email')
    this.token.next(null)
    localStorage.removeItem('Cart')
    this.Router.navigate(['login'])
    this.toastr.success('Logged out successfully.','', {
      progressBar: true,
      extendedTimeOut: 2000,
    });
  }
}
