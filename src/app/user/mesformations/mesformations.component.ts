import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as alertifyjs from 'alertifyjs';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { Form } from '@angular/forms';
import { CollaborateurserviceService } from 'src/app/services/collaborateurservice.service';
@Component({
  selector: 'app-mesformations',
  templateUrl: './mesformations.component.html',
  styleUrls: ['./mesformations.component.scss']
})
export class MesformationsComponent implements OnInit{
  ListFormations:any=[];
  id: any;
  tableData: any[] = []; // Array to store the result data
  selectedOption: string = 'All'; 

  constructor(private service:CollaborateurserviceService){}
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
       this.id = user.id_user;
       
       
      // Do something with the id_user value
      
    }
    this.GetAllFormations();
    //this.GetAllFormationsvalid();
  }

  GetAllFormationsvalid(){
    this.service.getValidDemandeByCollaborateur(this.id).subscribe(reps=>{
this.ListFormations=reps
console.log(reps);
    })
  }

  GetAllFormationsAnnuler(){
    this.service.getAnnulerDemandeByCollaborateur(this.id).subscribe(reps=>{
this.ListFormations=reps
console.log(reps);
    })
  }

  GetAllFormationsEnCours(){
    this.service.getEnCoursDemandeByCollaborateur(this.id).subscribe(reps=>{
this.ListFormations=reps
console.log(reps);
    })
  }


  GetAllFormations(){
    this.service.getAllDemandeByCollaborateur(this.id).subscribe(reps=>{
this.ListFormations=reps
console.log(reps);
    })
  }


  onRadioChange() {
    if (this.selectedOption === 'Valider') {
      this.GetAllFormationsvalid();
    }else if (this.selectedOption === 'Annuler') {
      this.GetAllFormationsAnnuler();
    } else if (this.selectedOption === 'En Cours') {
      this.GetAllFormationsEnCours();
    }else if (this.selectedOption === 'All') {
      this.GetAllFormations();
    }
  }



  openExternalLink(link: string) {
    window.open(link, '_blank');
  }
}
