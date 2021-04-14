import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../authguard.service';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private authService : AuthGuardService, private router : Router){ }
  canActivate() : Promise<boolean>{
    return this.authService.checkingAuthStateBoolean().then(bln => {
      if(bln === true) {
        this.router.navigate(['main-nav'])
        return !bln
      } else {

      }
      return !bln
    })
    }
  
}
