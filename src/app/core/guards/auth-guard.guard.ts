import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate  {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    throw new Error('Method not implemented.');
  }

}
