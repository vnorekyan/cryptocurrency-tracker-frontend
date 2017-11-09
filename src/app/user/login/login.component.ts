import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl = 'http://localhost:4200/user-profile';

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.userService.logout();
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(userForm: NgForm) {
    console.log(userForm.value);
    let email = userForm.controls['email'].value;
    let password = userForm.controls['password'].value;
    this.userService.login(email, password)
      .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/user-profile']);
      },
      error => {
        this.alertService.error(error);
      });
  }

}
