import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from 'src/app/services/adminservice.service';
import { DemandeformationService } from 'src/app/services/demandeformation.service';

@Component({
  selector: 'app-demande-valider',
  templateUrl: './demande-valider.component.html',
  styleUrls: ['./demande-valider.component.scss']
})
export class DemandeValiderComponent implements OnInit {
  
  clearInput() {
    const input = document.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = '';
  }
  ListDemande:any=[];
  ListDemande2:any=[];
  ListDemande3:any=[];
  sideBarOpen = true;
  searchQuery: string = '';
  filteredList: any[] = [];

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {this.GetAllDeamandeFormationsValider();
    
  }
  constructor(private service: AdminserviceService,private demandeService : DemandeformationService){}

  GetAllDeamandeFormationsValider(){
    this.demandeService.getAllDeamandeFormationValider().subscribe(reps=>{
    this.ListDemande=reps
    })
  }

  Annulerdemande(id:number){
    this.service.AnnulerrDemandeFormation(id).subscribe(res=>{
     
      this.GetAllDeamandeFormationsValider();
    })

  }

  GetAllDeamandeFormationsAnnuler(){
    this.demandeService.getAllDeamandeFormationAnnuler().subscribe(reps=>{
    this.ListDemande2=reps
    })
  }

  GetAllDeamandeFormationsAnnulerEn_Cours(){
    this.demandeService.getAllDeamandeFormationAnnuler_EnCours().subscribe(reps=>{
    this.ListDemande3=reps
    })
  }
  

  
}
