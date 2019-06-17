import { Component, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { NavbarService } from "src/app/services/navbar.service";
import { AdminService } from "src/app/auth/admin/admin.service";
import { AuthActions } from '../state-management/auth-state-management/auth.actions';
import { UserService } from 'src/app/auth/user/user.service';

@Component({
  selector: "app-login", // name of component
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  // DI - Dependency injection
  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private router: Router,
    private nav: NavbarService,
    private adminService: AdminService,
    private userService: UserService,
    private authActions: AuthActions
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{2,}")
        ]
      ]
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "login");
  }

  onSubmit() {
    this.nav.show();

    this.snackBar.open("One second, logging in..", "Close", {
      duration: 2000
    });

    if(this.loginForm.status === "VALID") {

      this.authActions.loggedIn(true)

      if (this.loginForm.value.username === 'admin') {
        // console.log("admin login route")
        this.adminService.login().subscribe(result => {
          if (result) {
            let url = this.adminService.redirectUrl ? this.userService.redirectUrl : '/admin/display-sitters';
            this.router.navigate([url]); 
          }
          else {
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.userService.login().subscribe(result => {
          if (result) {
            let url = this.userService.redirectUrl ? this.userService.redirectUrl : '/profile';
            this.router.navigate([url]); 
          }
          else {
            this.router.navigate(['/login']);
          }
        });
      }
    }
  }
}
