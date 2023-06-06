import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './responsable/home/home.component';
import { LoginComponent } from './login/login.component';
import { FormationComponent } from './responsable/formation/formation.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { ListeformationComponent } from './user/listeformation/listeformation.component';
import { MesformationsComponent } from './user/mesformations/mesformations.component';
import { ListedemandeComponent } from './responsable/listedemande/listedemande.component';
import { HomeUserComponent } from './user/home-user/home-user.component';
import { MyGuardGuard } from './guard/my-guard.guard';
import { UnauthorizedComponent } from './guard/unauthorized/unauthorized.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { AdminPlanFormationComponent } from './admin/admin-plan-formation/admin-plan-formation.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { DemandeAnnulerComponent } from './responsable/demande-annuler/demande-annuler.component';
import { DemandeValiderComponent } from './responsable/demande-valider/demande-valider.component';
import { GestionCollaborateurComponent } from './admin/gestion-collaborateur/gestion-collaborateur.component';
import { GestionResponsableComponent } from './admin/gestion-responsable/gestion-responsable.component';
import { CompetenceComponent } from './responsable/competence/competence.component';
import { GererCompetenceComponent } from './responsable/gerer-competence/gerer-competence.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'responsable/home', component: HomeComponent,canActivate: [MyGuardGuard], },

  { path: 'login', component: LoginComponent },
  { path: 'responsable/formation', canActivate: [MyGuardGuard],component: FormationComponent ,
  },
  { path: 'responsable/competences', canActivate: [MyGuardGuard],component: CompetenceComponent ,
},
{ path: 'responsable/competence/collaborateurs', canActivate: [MyGuardGuard],component: GererCompetenceComponent ,
},

  { path: 'user/listeformation',canActivate: [MyGuardGuard], component: ListeformationComponent,
   },
  { path: 'user/mesformations', canActivate: [MyGuardGuard],component: MesformationsComponent ,
  },
  { path: 'user/profile', canActivate: [MyGuardGuard],component: UserProfileComponent ,
  },
 
  { path: 'responsable/listedemandes', canActivate: [MyGuardGuard],component: ListedemandeComponent,
   },
   { path: 'responsable/demandevalider', canActivate: [MyGuardGuard],component: DemandeValiderComponent,
   },
   { path: 'responsable/demandeannuler', canActivate: [MyGuardGuard],component: DemandeAnnulerComponent,
  },
  { path: 'usernavbar', canActivate: [MyGuardGuard],component: UserNavbarComponent },
  { path: 'user/home',canActivate: [MyGuardGuard], component: HomeUserComponent ,
  },
  { path: '404', component: UnauthorizedComponent ,
},
{ path: 'admin/home', canActivate: [MyGuardGuard], component: HomeAdminComponent ,
},
{ path: 'admin/planformation', canActivate: [MyGuardGuard], component: AdminPlanFormationComponent ,
},
{ path: 'admin/gestionResponsable', canActivate: [MyGuardGuard], component: GestionResponsableComponent ,
},
{ path: 'admin/gestionCollaborateur', canActivate: [MyGuardGuard], component: GestionCollaborateurComponent ,
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
