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
export class DemandeformationService {

  constructor(private http: HttpClient) {

  }
  helper = new JwtHelperService()
  private  refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this.refreshrequired
  }
  saveDemandeFormation(data: any) {
    return this.http.post('http://localhost:8080/gestionformation/v1/dmandeformation', data).pipe(tap(()=>{

     this.RequiredRefresh.next();

    }));
  }
  
  getAllDeamandeFormationAnnuler_EnCours(): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>('http://localhost:8080/gestionformation/v1/demandeformation/annuler/en_cours');
  }


  getAllDeamandeFormationAnnuler(): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>('http://localhost:8080/gestionformation/v1/demandeformation/annuler/All');
  }

  getAllDeamandeFormationValider(): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>('http://localhost:8080/gestionformation/v1/demandeformation/valider/All');
  }

  getAllDeamandeFormationEnCours(): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>('http://localhost:8080/gestionformation/v1/demandeformation/encours/All');
  }

  getAllDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/collaborateur/' + id);
  }

  getAnnulerDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/annuler/' + id);
  }
  getEnCoursDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/encours/' + id);
  }
  getValidDemandeByCollaborateur(id: any): Observable<DemandeFormation> {
    return this.http.get<DemandeFormation>( 'http://localhost:8080/gestionformation/v1/demandeformation/valider/' + id);
  }

  supprimerDemandeFormation(data: any) {
    return this.http.delete('http://localhost:8080/gestionformation/v1/demandeformations/delete/' + data);

  }


  //borhen
  getNombreDemandesValides(){
    return this.http.get<number>('http://localhost:8080/gestionformation/v1/nombrevalides');
  }
  getNombreDemandesEnCours(){
    return this.http.get<number>('http://localhost:8080/gestionformation/v1/nombreencours');
  }
  getNombreDemandesAnnulees(){
    return this.http.get<number>('http://localhost:8080/gestionformation/v1/nombreannulees');
  }
  
}
