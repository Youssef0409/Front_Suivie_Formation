import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {
  role: any;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
         this.role = user.role;
        // Do something with the id_user value
       
        
      }
      if (state.url.startsWith('/user')) {
        // Allow access to user routes only if the role is "user"
        if (this.role === 'Collaborateur') {
          console.log(this.role);
          return true;
        } else {
          this.router.navigate(['/404']); // Redirect to unauthorized page for other roles
          return false; // Block access to the route
        }
      } else if (state.url.startsWith('/responsable')) {
        // Allow access to admin routes only if the role is "admin"
        if (this.role === 'Responsable') {
          return true;
        }         
        else {
          this.router.navigate(['/404']); // Redirect to unauthorized page for other roles
          return false; // Block access to the route
        }
      }else if (state.url.startsWith('/admin')) {
        // Allow access to admin routes only if the role is "admin"
        if (this.role === 'Admin') {
          return true;
        }         
        else {
          this.router.navigate(['/404']); // Redirect to unauthorized page for other roles
          return false; // Block access to the route
        }
      }

      
    return true;
  }
  
}
