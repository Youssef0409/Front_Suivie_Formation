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
import { DemandeFormation } from 'src/app/models/DemandeFormation';
import { Form } from '@angular/forms';
import { DemandeformationService } from 'src/app/services/demandeformation.service';

@Component({
  selector: 'app-listeformation',
  templateUrl: './listeformation.component.html',
  styleUrls: ['./listeformation.component.scss']
})
export class ListeformationComponent implements OnInit {
  idUser: any;

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
     this.idUser = user.id_user;
    // Do something with the id_user value
    
  }
    this.GetAllFormations();
  }
  ListFormations:any=[];
  constructor(private dialog:MatDialog,private service1:DemandeformationService,private service:FormationserviceService, private snackBar: MatSnackBar){}
  GetAllFormations(){
    this.service.getAllFormation().subscribe(reps=>{
this.ListFormations=reps
    })
  }

  createDemandeFormation(formationId: number) {
 
    // Créer un objet demandeFormation avec l'ID de la formation et de l'utilisateur
    const demandeFormation = {
      iddemande: null,
      etat: "En_cours",
      formation: { idformation: formationId },
      collaborateur: { id_user: this.idUser },
      heureFormation: new Date()
    };

    // Appeler votre service Angular pour envoyer la demande de formation
    // Utilisez la méthode HTTP appropriée (par exemple, POST) et l'URL de votre API
    // Assurez-vous d'injecter le service HttpClient dans votre composant
    this.service1.saveDemandeFormation(demandeFormation).subscribe(
      response => {
        // Traitement de la réponse
        console.log('Demande de formation créée avec succès !');
        this.showSuccessMessage();
      },
      error => {
        // Gestion des erreurs
        console.error('Erreur lors de la création de la demande de formation :', error);
        this.FailMessage();
      }
    );
  }


  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top

    this.snackBar.open('Demande envoyée', 'Close', config);
  }


  FailMessage() {
      
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top

    this.snackBar.open('Erreur d"envoie ', 'Close', config);
  }
}
