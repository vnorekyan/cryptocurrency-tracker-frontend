import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/index';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedIn = 'login';
  constructor(private userService: UserService) { }

  callLoginFunction() {
    let login = this.userService.loggedIn();
    if (login) {
      this.loggedIn = 'user-profile';
    } else {
      this.loggedIn = 'login';
    }
  }

  ngOnInit() {
    console.log('calling');
    this.callLoginFunction();

  }
}
