import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { Subject,tap } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt' ;

import { RegisterRequest } from '../models/register-request';
import { ResponsableRequest } from '../models/ResponsableRequest';
import { responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) {

  }

  private  refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this.refreshrequired
  }
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  getResponsableById(id: number): Observable<responsable> {
    const url = `http://localhost:8080/gestionformation/v1/responsable/${id}`;
    return this.http.get<responsable>(url);
  }
  supprimerResponsable(data: any) {
    return this.http.delete('http://localhost:8080/gestionformation/v1/responsable/delete/' + data);

  }
  getAllResponsables(): Observable<responsable> {
    return this.http.get<responsable>('http://localhost:8080/gestionformation/v1/responsable/All');
  }
  register(registerRequest: ResponsableRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/register', registerRequest);
  }
  UpdateResponsable(id: any, reserdata: any): Observable<ResponsableRequest> {
    return this.http.put<ResponsableRequest>('http://localhost:8080/gestionformation/v1/responsable/update/' + id, reserdata).pipe(tap(()=>{

      this.RequiredRefresh.next();
 
     }));

  }

}
