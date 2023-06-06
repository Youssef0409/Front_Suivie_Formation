import * as alertifyjs from 'alertifyjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CompetenceserviceService } from 'src/app/services/competenceservice.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.scss']
})
export class AddEditSkillsComponent implements OnInit {
  editmode: boolean = false;
  editdata: any;
  respdata: any;
  ListSkills: any = [];
  constructor(private snackBar: MatSnackBar,
    private service: CompetenceserviceService,
    @Inject(MAT_DIALOG_DATA) public d: any,
    public dialogRef: MatDialogRef<AddEditSkillsComponent>
  ) {}
  Reactiveform = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    nom: new FormControl("", Validators.required),
    lien: new FormControl("", Validators.required),
    score: new FormControl("", Validators.required),
    
  });
  ngOnInit(): void {
    this.editmode = this.d.editmo;
    this.GetAllSkills();

    if (this.d.id != null && this.d.id !== '') {
      this.service.getCompetenceById(this.d.id).subscribe(response => {
        this.editdata = response;
        console.log(this.editdata);
        this.Reactiveform.setValue({
          id: this.editdata.id,
          nom: this.editdata.nom,
          lien: this.editdata.lien,
          score: this.editdata.score,
         
        });
      });
    }
  }
  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top

    this.snackBar.open('Registration/Updated succeeded!', 'Close', config);
  }
  showFailMessage() {
    
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top

    this.snackBar.open('Registration/Updated failed!', 'Close', config);
  }
  updatecomp() {
    const editid = this.Reactiveform.getRawValue().id;
    this.service.UpdateCompetence(editid, this.Reactiveform.value).subscribe(result => {
      this.respdata = result;
      if (this.respdata) {
        this.dialogRef.close();
       this.showSuccessMessage();
      }
      location.reload();
    });
  }
  getReservFormData() {
    if (this.Reactiveform.valid) {
      const editid = this.Reactiveform.getRawValue().id;
      console.log(editid);
      if (editid != null && this.editmode) {
        this.updatecomp();
      } else {
        this.addcomp();
      }
    } else {
     this.showFailMessage();
    }
  }
  addcomp() {
    this.service.saveCompetence(this.Reactiveform.value).subscribe(result => {
      this.respdata = result;
      if (this.respdata) {
        this.dialogRef.close();
        this.showSuccessMessage();
      }
      location.reload();
    });
  }
  GetAllSkills(){
    this.service.getAllCompetence().subscribe(reps => {
      this.ListSkills = reps;
    });
  }
}
