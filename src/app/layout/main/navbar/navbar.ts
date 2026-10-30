import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/service/flowbite';
import { initFlowbite } from 'flowbite';
import { Auth } from '../../../core/service/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  //Injects
  private readonly _FlowbiteService = inject(FlowbiteService);
  private readonly _AuthService = inject(Auth);


  //FLowbite
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

//LogOut
  logOut():void{
    this._AuthService.logOut();
  }


}
