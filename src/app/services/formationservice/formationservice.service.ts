import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/models/Formation';
import { Subject,tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormationserviceService {
  readonly ApiUrl = "https://localhost:8080/";
  constructor(private http: HttpClient) {

  }
  private  refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this.refreshrequired
  }
  UpdateFormation(id: any, reserdata: any): Observable<Formation> {
    return this.http.put<Formation>('http://localhost:8080/gestionformation/v1/fo/' + id, reserdata).pipe(tap(()=>{

      this.RequiredRefresh.next();
 
     }));

  }
  supprimerFormation(data: any) {
    return this.http.delete('http://localhost:8080/gestionformation/v1/formations/' + data);

  }
  getFormationById(id: any): Observable<Formation> {
    return this.http.get<Formation>( 'http://localhost:8080/gestionformation/v1/formtions/' + id);
  }
  saveFormation(data: any) {
    return this.http.post('http://localhost:8080/gestionformation/v1/formations/create', data).pipe(tap(()=>{

     this.RequiredRefresh.next();

    }));
  }
  getAllFormation(): Observable<Formation> {
    return this.http.get<Formation>('http://localhost:8080/gestionformation/v1/formations/All');
  }

  //borhen
  getAllFormationDemande(): Observable<Formation[]> {
    return this.http.get<Formation[]>('http://localhost:8080/gestionformation/v1/formations/dem');
  }
}
