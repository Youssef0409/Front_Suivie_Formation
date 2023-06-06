import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Formation } from 'src/app/models/Formation';
import { CollaborateurserviceService } from 'src/app/services/collaborateurservice.service';
import { DemandeformationService } from 'src/app/services/demandeformation.service';
import { FormationserviceService } from 'src/app/services/formationservice/formationservice.service';
import { PlanFormationService } from 'src/app/services/plan-formation.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  nom: any;
  prenom: any;
 
  constructor(private routes:Router,private service: FormationserviceService,private service2:CollaborateurserviceService,private service3 : DemandeformationService,private planformation:PlanFormationService,private renderer: Renderer2, private elRef: ElementRef ){}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
       this.nom = user.nom;
       this.prenom = user.prenom;
       
      // Do something with the id_user value
      
    }



    this.initializeNavBar();
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

  
  logout() {
    localStorage.clear();
    this.routes.navigate(['/login']);
   
  }
}
