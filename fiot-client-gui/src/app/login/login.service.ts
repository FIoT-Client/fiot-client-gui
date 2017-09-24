import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginService {

  constructor(private authService: AuthService) { }

  doLogin(username: string, password: string) : boolean {
    //TODO Change to real login verification
    if (username == 'admin' && password == 'password') {
      this.authService.logIn(username, password);
      return true;
    } else {
      return false;
    }
  }

}
