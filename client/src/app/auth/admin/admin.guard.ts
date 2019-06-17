import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {//The canActivate method returns a boolean indicating whether or not navigation to a route should be allowed
  //if user is not authenticated, they're routed to the login
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,//ActivatedRouteSnapshot contains the future route that will be activated
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // RouterStateSnapshot contains the future RouterState of the app if guard check passes
      // console.log("admin guard");

      if (this.adminService.isLoggedIn) {
        return true; // Allowed access
      } 

      this.adminService.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false; // Not allowed access.
  }
  
}
