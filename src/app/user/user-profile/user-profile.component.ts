import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collaborateur } from 'src/app/models/collaborateur';
import { CollaborateurserviceService } from 'src/app/services/collaborateurservice.service';
import { CompetenceserviceService } from 'src/app/services/competenceservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  changePassword: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';

  id: any;
  collaborateur: Collaborateur = new Collaborateur() ;
  nom: any;
  competences:any=[];
  
  constructor(private competenceService : CompetenceserviceService,private collaborateurService:CollaborateurserviceService,private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.id=user.id_user;
      this.nom=user.nom;
      
       
       
      // Do something with the id_user value
      
    }
    this.getCollaborateur();
    this.getCompetences();
  }

  updateCollaborateur(id: number, collaborateur: Collaborateur) {
    this.collaborateurService.updateCollaborateur(id, collaborateur)
      .subscribe(
        updatedCollaborateur => {
          console.log('Collaborateur updated:', updatedCollaborateur);
          // Perform any additional actions after update
        },
        error => {
          console.error('Error updating collaborateur:', error);
          // Handle error appropriately
        }
      );
  }

  onFormSubmit() {
    if (this.newPassword.trim() != '') {
      if (this.newPassword === this.confirmPassword) {
        this.collaborateur.password=this.newPassword;
      
    this.collaborateurService.updateCollaborateur(this.id, this.collaborateur)
      .subscribe(
        updatedCollaborateur => {
          //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     localStorage.setItem('user', JSON.stringify(this.collaborateur));
     this.snackBar.open('Profile mise à jour avec succès!', 'Fermer', {
      duration: 3000,
      verticalPosition: 'top'
    }); 
          // Perform any additional actions after update
        },
        error => {
          this.snackBar.open('Erreur est survenue', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top'
          })
          // Handle error appropriately
        }
      );}else {
        // Passwords do not match, handle the error case
        this.snackBar.open('Les mots de passe ne correspondent pas.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top'
        });
  }}else {this.snackBar.open('Password should not be empty', 'Fermer', {
    duration: 3000,
    verticalPosition: 'top'
  });}

}


  getCollaborateur() {
    // Call your service method to fetch the existing collaborateur data
    this.collaborateurService.getCollaborateurById(this.id)
      .subscribe(
        existingCollaborateur => {
          // Populate the collaborateur object with the existing values
          this.collaborateur = existingCollaborateur;
          console.log(this.collaborateur);
        },
        error => {
          console.error('Error fetching collaborateur:', error);
          // Handle error appropriately
        }
      );
  }

  getCompetences() {
    this.competenceService.getCompetencesByCollaborateurId(this.id)
      .subscribe(
        (competences) => {
          this.competences = competences;
        },
        (error) => {
          console.log('Error fetching competences:', error);
        }
      );
  }
  
}
