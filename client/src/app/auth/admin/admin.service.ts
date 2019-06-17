import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  isLoggedIn: boolean = false;

  // store the URL the user tried to navigate tp so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    // console.log("login from admin service");

    return of(true).pipe(
      delay(1000),
      tap(val => {
        // console.log("admin is now logged in!");
        this.isLoggedIn = true
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
