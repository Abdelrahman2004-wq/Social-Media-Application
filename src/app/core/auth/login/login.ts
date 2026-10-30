import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../service/flowbite';
import { Auth } from '../../service/auth';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  //Injections
  private readonly _FlowbiteService = inject(FlowbiteService);
  private readonly _Auth = inject(Auth);
  private readonly _Router = inject(Router);
  private readonly _PlatformId = inject(PLATFORM_ID);
  //Properties
  errorMessages = "";
  loading:boolean = false;

  //FLowbite
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  loginForm: FormGroup = new FormGroup({
     //Email
    email: new FormControl('', [Validators.required, Validators.email]),
    //Password
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/),
    ])
  })

  submitData(): void {
  //Invalid Data  
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  //API Request
  this._Auth.singIn(this.loginForm.value).subscribe({
  next: (res) => {
  if (isPlatformBrowser(this._PlatformId)) {
    localStorage.setItem("SocialToken", res.data.token);
    localStorage.setItem("SocialUser", JSON.stringify(res.data.user));
  }
  this._Router.navigate(['app/feed']);   
},
    error: (err: HttpErrorResponse) => {
      this.errorMessages = err.error.message;
    },
    complete: () => {
      this.loading = false;
    },
  });
  }

}
