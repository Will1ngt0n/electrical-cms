import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private authService : AuthGuardService, private router : Router){ }

  canActivate() : Promise<boolean>{
  return this.authService.checkingAuthStateBoolean().then(bln => {
    console.log(bln);
    
    if(bln === false) {
      this.router.navigate(['login'])
    }
    return bln
  })
  }
}
