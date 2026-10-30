import { Component } from '@angular/core';
import { Register } from '../../core/auth/register/register';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [Register, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {}
