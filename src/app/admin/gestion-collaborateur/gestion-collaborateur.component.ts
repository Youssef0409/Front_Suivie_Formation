import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as alertifyjs from 'alertifyjs';
import { CollaborateurserviceService } from 'src/app/services/collaborateurservice.service';
import { AddEditCollaborateurComponent } from './add-edit-collaborateur/add-edit-collaborateur.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestion-collaborateur',
  templateUrl: './gestion-collaborateur.component.html',
  styleUrls: ['./gestion-collaborateur.component.scss']
})
export class GestionCollaborateurComponent {
  nom: any;
  prenom: any;
  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private routes:Router,private renderer: Renderer2, private elRef: ElementRef , private service: CollaborateurserviceService){}
  editmode:boolean=false;
  ListCollab:any=[];
  ngOnInit(): void {
this.GetAllCollab();
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
       this.nom = user.nom;
       this.prenom = user.prenom;
       
      // Do something with the id_user value
      
    }
  // Code pour la barre de navigation (NavBar)
  this.initializeNavBar();
  }
  supprimer(id:any){
    alertifyjs.confirm("Supprimer Le Collaborateur","Voulez vous supprimer le Collaborateur?",()=>{ this.service.supprimerCollaborateur(id).subscribe(del=>{
     this.GetAllCollab();
     this.showSuccessMessage();
    })
  
    },function(){
  
    })
   
  }
  OpenDialog(enteranimation:any,exitanimation:any,id:any){
    this.dialog.open(AddEditCollaborateurComponent,{
         enterAnimationDuration:enteranimation,
         exitAnimationDuration:exitanimation,
         width: '700px',
         data:{
          id_user:id,
           editmo:this.editmode,
   
         }
         
         
         
         
         
       })
   
     }
     update(id:any){
      this.editmode=true;
     this.OpenDialog('1000ms','600ms',id)
     this.GetAllCollab();
     
  
    }
    logout() {
      localStorage.clear();
      this.routes.navigate(['/login']);
     
    }
    add(){
      this.editmode=false;
      this.OpenDialog('1000ms','600ms','')
     this.GetAllCollab();
  
    }
  GetAllCollab(){
    this.service.getAllCollaborateurs().subscribe(res=>{
      console.log(res);
      this.ListCollab=res
    })
  }
  initializeNavBar() {
    const arrows = this.elRef.nativeElement.querySelectorAll('.arrow');
    arrows.forEach((arrow: any) => {
      this.renderer.listen(arrow, 'click', (event) => {
        const arrowParent = event.target.closest('.arrow')?.parentElement?.parentElement;
        if (arrowParent) {
          arrowParent.classList.toggle('showMenu');

          // Save the state in localStorage
          const menuId = arrowParent.id;
          const isExpanded = arrowParent.classList.contains('showMenu');
          localStorage.setItem(menuId, isExpanded.toString());
        }
      });
    });

    const sidebarBtn = this.elRef.nativeElement.querySelector('.bx-menu');
    if (sidebarBtn) {
      this.renderer.listen(sidebarBtn, 'click', () => {
        const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
        if (sidebar) {
          sidebar.classList.toggle('close');

          // Save the state in localStorage
          const isSidebarClosed = sidebar.classList.contains('close');
          localStorage.setItem('sidebarClosed', isSidebarClosed.toString());
        }
      });
    }
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

  this.snackBar.open('Delete failed!', 'Close', config);
}
}
