import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { Subject,tap } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt' ;
import { ValidDemnde } from '../models/ValidDeamnde';
import { DemandeFormation } from '../models/DemandeFormation';
import { Collaborateur } from '../models/collaborateur';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurserviceService {

  constructor(private http: HttpClient ,private jwtHelper: JwtHelperService) {

  }
  helper = new JwtHelperService()
  private  refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this.refreshrequired
  }

  updateCollaborateur(id: number, collaborateur: Collaborateur): Observable<Collaborateur> {
    const url = `http://localhost:8080/gestionformation/v1/collaborateur/${id}`;
    return this.http.put<Collaborateur>(url, collaborateur);
  }


  getValidDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/valider/' + id);
  }
  getEnCoursDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/encours/' + id);
  }
  getAnnulerDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/annuler/' + id);
  }

  getAllDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/collaborateur/' + id);
  }
  supprimerCollaborateur(data: any) {
    return this.http.delete('http://localhost:8080/gestionformation/v1/collaborateur/delete/' + data);

  }
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  getCollaborateurById(id: number): Observable<Collaborateur> {
    const url = `http://localhost:8080/gestionformation/v1/collaborateur/${id}`;
    return this.http.get<Collaborateur>(url);
  }

  getAllCollaborateurs(): Observable<RegisterRequest> {
    return this.http.get<RegisterRequest>('http://localhost:8080/gestionformation/v1/collaborateur/All');
  }

  //////borhen
  getNombreCollaborateurs(){
    return this.http.get<number>('http://localhost:8080/gestionformation/v1/total');
  }
  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/auth/register', registerRequest);
  }
}
