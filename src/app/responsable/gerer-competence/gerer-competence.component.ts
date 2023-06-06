import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { competence } from 'src/app/models/competence';
import { CollaborateurserviceService } from 'src/app/services/collaborateurservice.service';
import { CompetenceserviceService } from 'src/app/services/competenceservice.service';
import * as alertifyjs from 'alertifyjs';
import { AddCompetenceCollaborateurComponent } from './add-competence-collaborateur/add-competence-collaborateur.component';
@Component({
  selector: 'app-gerer-competence',
  templateUrl: './gerer-competence.component.html',
  styleUrls: ['./gerer-competence.component.scss']
})
export class GererCompetenceComponent {
  sideBarOpen = true;
  editmode:boolean=false;
  sideBarToggler() {
    
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {
    this.GetAllCollab();
  }
  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private collaborateurService :CollaborateurserviceService,private competenceService : CompetenceserviceService){}
  ListCollab:any=[];
  ListComp:any=[];
  

  GetAllCollab() {
    this.collaborateurService.getAllCollaborateurs().subscribe(reps => {
      this.ListCollab = reps;
     
      // Retrieve competences for each collaborateur
      this.ListCollab.forEach((collab: { id_user: number; competences: competence[]; }) => {
        this.competenceService.getCompetencesByCollaborateurId(collab.id_user).subscribe(competences => {
          collab.competences = competences;
          
        });
      });
    });
  }

  supprimer(idCollab:any,idComp:any){
    alertifyjs.confirm("Supprimer La competence du Collaborateur","Voulez vous supprimer la competence?",()=>{ this.competenceService.deleteCompetenceByCollab(idCollab,idComp).subscribe(del=>{
      this.GetAllCollab();
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
    this.dialog.open(AddCompetenceCollaborateurComponent,{
         enterAnimationDuration:enteranimation,
         exitAnimationDuration:exitanimation,
         width: '700px',
         data:{
          id:id,
           editmo:this.editmode,
         
         }
         
         
         
         
         
       })
      
     }

     add(id:any){
      this.editmode=false;
    
      this.OpenDialog('300ms','400ms',id)
     
     this.GetAllCollab();
  
    }


              
}
