import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username = 'User';
  userInfo: any = {};
  constructor(private userService: UserService, private alertService: AlertService) { }

  getUserInfo() {
    this.userService.getProfile()
      .subscribe(
      data => {
        data = JSON.parse(JSON.stringify(data || null));
        this.userInfo = data;
        this.username = this.userInfo.first_name + ' ' + this.userInfo.last_name;
      },
      error => {
        this.alertService.error(error);
      });
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
