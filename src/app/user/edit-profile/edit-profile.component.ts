import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  username = 'User';
  userInfo: any = {};
  model: any = {};
  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router, private alertService: AlertService) { }

  getUserInfo() {
    this.userService.getProfile()
      .subscribe(
      data => {
        data = JSON.parse(JSON.stringify(data || null));
        this.userInfo = data;
        this.model = data;
        this.username = this.userInfo.first_name + ' ' + this.userInfo.last_name;
      },
      error => {
        this.alertService.error(error);
      });
  }

  editProfile() {
    console.log(this.model);
    this.userService.update(this.model)
      .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/user-profile']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  // deletes profile with button click
  deleteProfile() {
    this.userService.delete()
      .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => {
        this.alertService.error(error);
      });

  }


  ngOnInit() {
    this.getUserInfo();
  }
}
