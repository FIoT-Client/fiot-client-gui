// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: 'login.component.html'
// })
// export class LoginComponent { }


import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    if (this.loginService.doLogin(this.username, this.password)) {
      console.log('Success');
    } else {
      console.log('Error');
    }
  }

  recoverPassword() {
    console.log('Recover password');
  }

  register() {
    window.open('https://account.lab.fiware.org/sign_up/');
  }

}