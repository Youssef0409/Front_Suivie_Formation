import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Formation } from 'src/app/models/Formation';
import { CollaborateurserviceService } from 'src/app/services/collaborateurservice.service';
import { DemandeformationService } from 'src/app/services/demandeformation.service';
import { FormationserviceService } from 'src/app/services/formationservice/formationservice.service';
import { PlanFormationService } from 'src/app/services/plan-formation.service';
import { jsPDF } from 'jspdf';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-plan-formation',
  templateUrl: './admin-plan-formation.component.html',
  styleUrls: ['./admin-plan-formation.component.scss']
})
export class AdminPlanFormationComponent implements OnInit{
  @ViewChild('content', {static:false}) el!: ElementRef
  formations: Formation[] = [];
  totalCollaborateurs: number = 0;
  result : any ;
  nombreDemandesValides: number = 0;
  nombreDemandesEnCours: number = 0;
  nombreDemandesAnnulees: number = 0;
  nombreFormations!: number;
  nombreParticipantsTotal!: number;
  coutTotal!: number;
  budgetTotal!: number;

  @ViewChild('formationChart')
  formationChart!: ElementRef;
  @ViewChild('nombreformations')
  nombreformations!: ElementRef;
  @ViewChild('nombrecollaborateur')
  nombrecollaborateur!: ElementRef;
  nom: any;
  prenom: any;
  constructor(private routes:Router,private service: FormationserviceService,private service2:CollaborateurserviceService,private service3 : DemandeformationService,private planformation:PlanFormationService,private renderer: Renderer2, private elRef: ElementRef,private http: HttpClient ){}

  ngOnInit(): void {
    this.genererPlanGlobal("ezae");
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
       this.nom = user.nom;
       this.prenom = user.prenom;
       
      // Do something with the id_user value
      
    }

    this.service.getAllFormationDemande().subscribe((formations: Formation[]) => {
      this.formations = formations;
      this.createChart();
    });
    this.service3.getNombreDemandesValides().subscribe((nombre: number) => {
      this.nombreDemandesValides = nombre;
      this.createChart2();
  });
  this.service3.getNombreDemandesEnCours().subscribe((nombre: number) => {
    this.nombreDemandesEnCours = nombre;
    this.createChart2();
});
this.service3.getNombreDemandesAnnulees().subscribe((nombre: number) => {
  this.nombreDemandesAnnulees = nombre;
  this.createChart2();
});
this.service2.getNombreCollaborateurs().subscribe((total: number) => {
  this.totalCollaborateurs = total;
  this.createCollaborateursChart();
});

   


    // Code pour la barre de navigation (NavBar)
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




  createCollaborateursChart(): void {
    const chartCanvas = this.nombrecollaborateur.nativeElement;
    const ctx: CanvasRenderingContext2D | null = chartCanvas.getContext('2d');
  
    if (ctx) {
      const chartData = {
        labels: ['Total Collaborateurs'],
        datasets: [{
          label: 'Nombre de Collaborateurs',
          data: [this.totalCollaborateurs],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      };
  
      const chartOptions = {
        // Options du graphique...
      };
  
      new Chart(ctx, {
        type: 'bar', // Ou 'pie' pour un graphique circulaire
        data: chartData,
        options: chartOptions
      });
    }
  }
  createChart2(): void {
    const chartCanvas: HTMLCanvasElement = this.nombreformations.nativeElement;
    const ctx: CanvasRenderingContext2D | null = chartCanvas.getContext('2d');
  
    // Destroy previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
  
    if (ctx) {
      const chartData = {
        labels: ['Demandes Validées', 'Demandes en Cours', 'Demandes Annulées'],
        datasets: [{
          label: 'Nombre de Demandes',
          data: [this.nombreDemandesValides, this.nombreDemandesEnCours, this.nombreDemandesAnnulees],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      };
  
      // Set individual colors for each bar
      chartData.datasets[0].backgroundColor = ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'];

      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      };
  
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  }
chart: Chart | undefined;
ngOnDestroy() {
  this.destroyChart();
}
destroyChart() {
  if (this.chart) {
    this.chart.destroy();
  }
}
  
  createChart(): void {
    const chartCanvas = this.formationChart.nativeElement;
    const ctx: CanvasRenderingContext2D | null = chartCanvas.getContext('2d');
  
    if (ctx) {
      const labels: string[] = [];
      const data: number[] = [];
      const backgroundColor: string[] = []; // Tableau pour les couleurs de fond des barres
  
      this.formations.forEach((formation: any, index: number) => {
        if (formation[0].titre && formation[1]) {
          labels.push(formation[0].titre);
          data.push(formation[1]);
          // Ajoutez une couleur différente pour chaque barre
          backgroundColor.push(index % 2 === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(54, 162, 235, 0.2)');
        }
      });
  
      const chartData = {
        labels: labels,
        datasets: [{
          label: 'Formations les plus demandées',
          data: data,
          backgroundColor: backgroundColor, // Utilisez le tableau des couleurs de fond
          borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la bordure commune à toutes les barres
          borderWidth: 1
        }]
      };
  
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      };
  
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  }
  genererPlanGlobal(titre: string) {
    this.http.post('http://localhost:8080/gestionformation/v1/genererplanglobal', { titre })
      .subscribe(
        (response: any) => {
          this.nombreFormations = response.nombre_formations;
          this.nombreParticipantsTotal = response.nombre_participants;
          this.coutTotal = response.cout;
          this.budgetTotal = response.budget_total;

         
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la création du plan de formation global :', error);
        }
      );
  }

  genererPDF() {
    const titre = 'Titre du plan de formation';
    this.genererPlanGlobal(titre);
  }
  genererPlanGlobalExcell(titre: string) {
    this.http.post('http://localhost:8080/gestionformation/v1/genererplanglobal', { titre })
      .subscribe(
        (response: any) => {
          
          this.nombreFormations = response.nombre_formations;
          this.nombreParticipantsTotal = response.nombre_participants;
          this.coutTotal = response.cout;
          this.budgetTotal = response.budget_total;

          console.log('Le plan de formation global a été créé avec succès !', response);

          // Créer un tableau de données
          const data = [
            ['Titre du plan', titre],
            ['Nombre de formations', this.nombreFormations],
            ['Nombre total de participants', this.nombreParticipantsTotal],
            ['Coût total', this.coutTotal],
            ['Budget total', this.budgetTotal]
          ];

          // Créer un classeur Excel
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.aoa_to_sheet(data);
          XLSX.utils.book_append_sheet(wb, ws, 'PlanFormation');

          // Générer le fichier Excel
          const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          this.saveExcelFile(excelBuffer, 'plan_formation.xlsx');
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la création du plan de formation global :', error);
        }
      );
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }

  genererExcel() {
    const titre = 'Titre du plan de formation';
    this.genererPlanGlobalExcell(titre);
  }
 

  logout() {
    localStorage.clear();
    this.routes.navigate(['/login']);
    
    
  }

  makePDf() {
    const element = this.el.nativeElement;
    
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Plan Formation.pdf');
    });
  }

}
