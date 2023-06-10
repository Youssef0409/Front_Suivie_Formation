import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as alertifyjs from 'alertifyjs';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { Form } from '@angular/forms';

import { AdminserviceService } from 'src/app/services/adminservice.service';
@Component({
  selector: 'app-listedemande',
  templateUrl: './listedemande.component.html',
  styleUrls: ['./listedemande.component.scss']
})
export class ListedemandeComponent {



  clearInput() {
    const input = document.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = '';
  }


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  ListDemande:any=[];
  ngOnInit(): void {
    this.GetAllDeamandeFormations();
  }
  constructor(private snackBar: MatSnackBar,private service: AdminserviceService){}
  GetAllDeamandeFormations(){
    this.service.getAllDeamandeFormationEnCours().subscribe(reps=>{
this.ListDemande=reps
    })
  }
  validerdemande(id:number){
    this.service.validerDemandeFormation(id).subscribe(res=>{
      this.showSuccessMessage();
      this.GetAllDeamandeFormations();
    })

  }
  Annulerdemande(id:number){
    this.service.AnnulerrDemandeFormation(id).subscribe(res=>{
     this.showAnnulerMessage();
      this.GetAllDeamandeFormations();
    })

  }



  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top
  
    this.snackBar.open('Bravo! Demande est validée avec succès', 'Close', config);
  }

  showAnnulerMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top
  
    this.snackBar.open('Bravo demande est annuléé', 'Close', config);
  }

  

}
