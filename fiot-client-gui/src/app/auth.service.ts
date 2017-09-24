import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  loggedUser = null;

  constructor() { }

  isLoggedIn() {
    return this.loggedUser != null && this.loggedUser != {};
  }

  logIn(username: string, password: string) {
    console.log(`Logging in user ${username} with password ${password}`);
    this.loggedUser = {};
    this.loggedUser['username'] = username;
    this.loggedUser['password'] = password;
    console.log(this.loggedUser);
  }

  logOut() {
    this.loggedUser = null;
  }

}
