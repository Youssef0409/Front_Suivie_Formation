import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as alertifyjs from 'alertifyjs';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { FormationserviceService } from 'src/app/services/formationservice/formationservice.service';

import { AddEditFormComponent } from 'src/app/add-edit-form/add-edit-form.component';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit  {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {
    this.GetAllFormations();
  }
  editmode:boolean=false;
  ListFormations:any=[];
  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private service:FormationserviceService){}
  supprimer(id:any){
    alertifyjs.confirm("Supprimer La formation","Voulez vous supprimer la formation?",()=>{ this.service.supprimerFormation(id).subscribe(del=>{
     this.GetAllFormations();
     this.showSuccessMessage();

      this.GetAllFormations();
    })
  
    },function(){
  
    })
   
  }
  OpenDialog(enteranimation:any,exitanimation:any,id:any){
    this.dialog.open(AddEditFormComponent,{
         enterAnimationDuration:enteranimation,
         exitAnimationDuration:exitanimation,
         width: '700px',
         data:{
          idformation:id,
           editmo:this.editmode,
   
         }
         
         
         
         
         
       })
   
     }
     update(id:any){
      this.editmode=true;
     this.OpenDialog('1000ms','600ms',id)
     this.GetAllFormations();
     
  
    }

  add(){
    this.editmode=false;
    this.OpenDialog('1000ms','600ms','')
   this.GetAllFormations();

  }
  GetAllFormations(){
    this.service.getAllFormation().subscribe(reps=>{
this.ListFormations=reps
    })
  }


  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top
  
    this.snackBar.open('Delete succeeded!', 'Close', config);
  }
}
