import * as alertifyjs from 'alertifyjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormationserviceService } from 'src/app/services/formationservice/formationservice.service';
import { formatDate } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CompetenceserviceService } from 'src/app/services/competenceservice.service';

@Component({
  selector: 'app-add-competence-collaborateur',
  templateUrl: './add-competence-collaborateur.component.html',
  styleUrls: ['./add-competence-collaborateur.component.scss']
})
export class AddCompetenceCollaborateurComponent {

  editmode: boolean = false;
  editdata: any;
  respdata: any;
  ListCompetences: any = [];

  Reactiveform = new FormGroup({
    
   
    competence: new FormControl("", Validators.required),
    
  });

  constructor(private dialog:MatDialog,private snackBar: MatSnackBar,
    private service: CompetenceserviceService,
    @Inject(MAT_DIALOG_DATA) public d: any,
    public dialogRef: MatDialogRef<AddCompetenceCollaborateurComponent>
  ) {}

  ngOnInit(): void {
    this.editmode = this.d.editmo;
    this.GetAllCompetences();

   
  }

  getReservFormData() {
    if (this.Reactiveform.valid) {
     
    
        this.addComptence();
      
    } else {
      alertifyjs.error("Merci d'entrer des données valides pour La Formation");
    }
  }

  addComptence() {
    const selectedCompetenceId = Number(this.Reactiveform.controls['competence'].value);
    console.log(this.d.id);
    this.service.addCompetenceToCollaborateur(this.d.id,selectedCompetenceId).subscribe(result => {
      this.respdata = result;
      console.log(this.respdata);
      if (this.respdata) {
        this.dialogRef.close();
      this.showSuccessMessage();
      }
      location.reload();
      
    }); {
        this.showFailMessage();
      }
  }



  GetAllCompetences() {
    this.service.getAllCompetence().subscribe(reps => {
      this.ListCompetences = reps;
    });
  }




  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top
  
    this.snackBar.open('Delete succeeded!', 'Close', config);
  }

  showFailMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top
  
    this.snackBar.open('Collaborateur a déja cette competence', 'Close', config);
  }
}
