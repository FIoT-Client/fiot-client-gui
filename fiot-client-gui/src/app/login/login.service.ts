import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private authService: AuthService, private router: Router) { }

  doLogin(username: string, password: string) : boolean {
    // TODO Change to real login verification
    if (username === 'admin' && password === 'password') {
      this.authService.logIn(username, password);
      this.router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }

}
