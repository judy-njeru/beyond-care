import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store';
import { AuthActions } from 'src/app/pages/state-management/auth-state-management/auth.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  isLoggedIn: boolean;

  constructor( private router: Router, private authActions: AuthActions, private ngRedux: NgRedux<AppState>) { }


  ngOnInit() {

    this.ngRedux
        .select(state => state.login) //subscribe to login state from the store
        .subscribe(res => {
          this.isLoggedIn = res.isLoggedIn;
        }
    );
  }

logout(){
this.authActions.loggedIn(false)
this.router.navigate(["/login"]);
}


}
