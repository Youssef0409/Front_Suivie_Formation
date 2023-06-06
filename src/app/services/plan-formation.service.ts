import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanFormationService {
  constructor(private http: HttpClient) { }
  private  refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this.refreshrequired
  }
  saveFormation(data: any) {
    return this.http.post('http://localhost:8080/gestionformation/v1/genererplanglobal', data).pipe(tap(()=>{

     this.RequiredRefresh.next();

    }));
  }
}
