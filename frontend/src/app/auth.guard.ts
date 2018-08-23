import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(`Logged user: ${JSON.stringify(this.authService.loggedUser)}`);
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // navigate to login page
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return true;
  }

}
