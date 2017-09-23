import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }

  doLogin(username: string, password: string) : boolean {
    return true;
  }

}
