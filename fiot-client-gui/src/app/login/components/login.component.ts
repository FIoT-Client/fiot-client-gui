import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    if(this.loginService.doLogin(this.username, this.password)) {
      console.log("Success");
    }
  }

  register() {
    window.open('https://account.lab.fiware.org/sign_up/');
  }

}
