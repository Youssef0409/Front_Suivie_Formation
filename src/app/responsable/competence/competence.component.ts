import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as alertifyjs from 'alertifyjs';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { CompetenceserviceService } from 'src/app/services/competenceservice.service';
import { AddEditSkillsComponent } from './add-edit-skills/add-edit-skills.component';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent {
  sideBarOpen = true;
  editmode:boolean=false;
  Listskills:any=[];
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {
    this.GetAllSkills();
  }
  GetAllSkills(){ this.service.getAllCompetence().subscribe(reps=>{
    this.Listskills=reps
        })}
  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private service:CompetenceserviceService){}
  supprimer(id:any){
    alertifyjs.confirm("Supprimer La competence","Voulez vous supprimer la competence?",()=>{ this.service.supprimerComptence(id).subscribe(del=>{
      this.GetAllSkills();
     this.showSuccessMessage();
  
    })
  
    },function(){
  
    })
   
  }
  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top
  
    this.snackBar.open('Delete succeeded!', 'Close', config);
  }
  OpenDialog(enteranimation:any,exitanimation:any,id:any){
    this.dialog.open(AddEditSkillsComponent,{
         enterAnimationDuration:enteranimation,
         exitAnimationDuration:exitanimation,
         width: '700px',
         data:{
          id:id,
           editmo:this.editmode,
   
         }
         
         
         
         
         
       })
   
     }
     update(id:any){
      this.editmode=true;
     this.OpenDialog('1000ms','600ms',id)
     this.GetAllSkills();
     
  
    }
    add(){
      this.editmode=false;
      this.OpenDialog('1000ms','600ms','')
     this.GetAllSkills();
  
    }
}
