import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { Utilisateur } from '../models/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/authenticate', loginRequest);
  }

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/register', registerRequest);
  }

 

  logout() {
    const url = 'http://localhost:8080/api/v1/auth/logout';
    return this.http.post(url, null);
  }


  getUserByEmail(email: string): Observable<Utilisateur> {
    const url = `http://localhost:8080/gestionformation/v1/user/email/${email}`;
    return this.http.get<Utilisateur>(url);
  }
}
