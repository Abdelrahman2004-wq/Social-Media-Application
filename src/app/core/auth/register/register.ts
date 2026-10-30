import { FlowbiteService } from './../../service/flowbite';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Auth } from '../../service/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
//Injections
  private readonly _FlowbiteService = inject(FlowbiteService);
  private readonly _Auth = inject(Auth);
  private readonly _Router = inject(Router);

//Properties
  errorMessages = "";
  loading:boolean = false;

  //FLowbite
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  //Form
  registerForm: FormGroup = new FormGroup({
    //Name
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    //UserName
    username: new FormControl('', [Validators.minLength(5), Validators.maxLength(20)]),
    //Email
    email: new FormControl('', [Validators.required, Validators.email]),
    //Gender
    gender: new FormControl('', [Validators.required, Validators.pattern(/^(male|female)$/)]),
    //Date of Birth
    dateOfBirth: new FormControl('', [Validators.required]),
    //Password
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/),
    ]),
    //RePassword
    rePassword: new FormControl('', Validators.required),
  },
  //RePassword Validation
  {validators:this.confirmPassword});

  //Submit Data
  submitData(): void {

  //Invalid Data  
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }
  this.loading = true;

  //API Request
  this._Auth.singUp(this.registerForm.value).subscribe({
    next: (res) => {
      console.log(res);
      //Navigate to Login
      this._Router.navigate(['auth/login']);
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessages = err.error.message;
    },
    complete: () => {
      this.loading = false;
    },
  });
  }

  //Confirm Password
  confirmPassword(group:AbstractControl){
    const password = group.get("password")?.value;
    const rePassword = group.get("rePassword")?.value;
    if (rePassword !== password && rePassword !== "") {
      group.get("rePassword")?.setErrors({mismatch:true});
      return {mismatch:true};
    }
    else{
      return null;
    }
  }

}
