import { Component } from '@angular/core';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { DemandeformationService } from 'src/app/services/demandeformation.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-demande-annuler',
  templateUrl: './demande-annuler.component.html',
  styleUrls: ['./demande-annuler.component.scss']
})
export class DemandeAnnulerComponent {
  clearInput() {
    const input = document.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = '';
  }
  ListDemande:any=[];
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {this.GetAllDeamandeFormationsAnnuler();
    
  }
  constructor(private service: AdminserviceService,private demandeService : DemandeformationService){}

  GetAllDeamandeFormationsAnnuler(){
    this.demandeService.getAllDeamandeFormationAnnuler().subscribe(reps=>{
    this.ListDemande=reps
    })
  }

 

  validerdemande(id:number){
    this.service.validerDemandeFormation(id).subscribe(res=>{
      
      this.GetAllDeamandeFormationsAnnuler();
    })

  }


  supprimer(id:any){
    alertifyjs.confirm("Supprimer La formation","Voulez vous supprimer la formation?",()=>{ this.demandeService.supprimerDemandeFormation(id).subscribe(del=>{
      this.GetAllDeamandeFormationsAnnuler();
      
     
    })
  
    },function(){
  
    })
   
  }
}
