import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { Subject,tap } from 'rxjs';
import { competence } from '../models/competence';
@Injectable({
  providedIn: 'root'
})
export class CompetenceserviceService {

  constructor(private http: HttpClient) {

  }
  private  refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this.refreshrequired
  }
  UpdateCompetence(id: any, reserdata: any): Observable<competence> {
    return this.http.put<competence>('http://localhost:8080/gestionformation/v1/competence/update/' + id, reserdata).pipe(tap(()=>{

      this.RequiredRefresh.next();
 
     }));

  }
  supprimerComptence(data: any) {
    return this.http.delete('http://localhost:8080/gestionformation/v1/competence/delete/' + data);

  }
  saveCompetence(data: any) {
    return this.http.post('http://localhost:8080/gestionformation/v1/competence/create', data).pipe(tap(()=>{

     this.RequiredRefresh.next();

    }));
  }
  getCompetenceById(id: any): Observable<competence> {
    return this.http.get<competence>( 'http://localhost:8080/gestionformation/v1/competence/' + id);
  }
  getAllCompetence(): Observable<competence> {
    return this.http.get<competence>('http://localhost:8080/gestionformation/v1/competence/All');
  }

  private baseUrl = 'http://localhost:8080/gestionformation/v1/collaborateurs';

  getCompetencesByCollaborateurId(collaborateurId: number): Observable<competence[]> {
    const url = `${this.baseUrl}/${collaborateurId}/competences`;
    return this.http.get<competence[]>(url);
  }

  addCompetenceToCollaborateurr(collaborateurId: number, competence: competence): Observable<competence> {
    const url = `${this.baseUrl}/${collaborateurId}/competences`;
    return this.http.post<competence>(url, competence);
  }

  deleteCompetenceByCollab(collaborateurId: number, competenceId: number): Observable<any> {
    const url = `${this.baseUrl}/${collaborateurId}/competences/${competenceId}`;
    return this.http.delete(url);
  }


  addCompetenceToCollaborateur(collaborateurId: number, competenceId: number): Observable<any> {
    const url = `http://localhost:8080/gestionformation/v1/collaborateurs/${collaborateurId}/competences/${competenceId}`;
    return this.http.post(url, null);
  }
}
