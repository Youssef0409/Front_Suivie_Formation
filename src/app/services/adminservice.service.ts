import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { Subject,tap } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt' ;
import { DemandeFormation } from '../models/DemandeFormation';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private http: HttpClient) {

  }
  helper = new JwtHelperService()
  private  refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this.refreshrequired
  }
  getAllDeamandeFormationEnCours(): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>('http://localhost:8080/gestionformation/v1/demandeformation/encours/All');
  }
  validerDemandeFormation(idDemandeFormation: number): Observable<DemandeFormation> {
    return this.http.put<DemandeFormation>('http://localhost:8080/gestionformation/v1/valider/' + idDemandeFormation, {});
  }
  AnnulerrDemandeFormation(idDemandeFormation: number): Observable<DemandeFormation> {
    return this.http.put<DemandeFormation>('http://localhost:8080/gestionformation/v1/annuler/' + idDemandeFormation, {});
  }
}
