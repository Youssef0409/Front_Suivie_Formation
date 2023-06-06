import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

// Angular Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// Third-party Imports
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// App Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './responsable/home/home.component';
import { LoginComponent } from './login/login.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { FormationComponent } from './responsable/formation/formation.component';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ListeformationComponent } from './user/listeformation/listeformation.component';
import { MesformationsComponent } from './user/mesformations/mesformations.component';
import { ListedemandeComponent } from './responsable/listedemande/listedemande.component';
import { HomeUserComponent } from './user/home-user/home-user.component';
import { MyGuardGuard } from './guard/my-guard.guard';
import { UnauthorizedComponent } from './guard/unauthorized/unauthorized.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminPlanFormationComponent } from './admin/admin-plan-formation/admin-plan-formation.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { DemandeValiderComponent } from './responsable/demande-valider/demande-valider.component';
import { DemandeAnnulerComponent } from './responsable/demande-annuler/demande-annuler.component';
import { FormationValiderUserComponent } from './user/formation-valider-user/formation-valider-user.component';
import { GestionResponsableComponent } from './admin/gestion-responsable/gestion-responsable.component';
import { GestionCollaborateurComponent } from './admin/gestion-collaborateur/gestion-collaborateur.component';
import { AddEditResponsableComponent } from './admin/gestion-responsable/add-edit-responsable/add-edit-responsable.component';
import { AddEditCollaborateurComponent } from './admin/gestion-collaborateur/add-edit-collaborateur/add-edit-collaborateur.component';
import { CompetenceComponent } from './responsable/competence/competence.component';
import { AddEditSkillsComponent } from './responsable/competence/add-edit-skills/add-edit-skills.component';
import { GererCompetenceComponent } from './responsable/gerer-competence/gerer-competence.component';
import { AddCompetenceCollaborateurComponent } from './responsable/gerer-competence/add-competence-collaborateur/add-competence-collaborateur.component';
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    UserNavbarComponent,
    FormationComponent,
    AddEditFormComponent,
    ListeformationComponent,
    MesformationsComponent,
    ListedemandeComponent,
    HomeUserComponent,
    UnauthorizedComponent,
    HomeAdminComponent,
    AdminNavbarComponent,
    AdminPlanFormationComponent,
    UserProfileComponent,
    DemandeValiderComponent,
    DemandeAnnulerComponent,
    FormationValiderUserComponent,
    GestionResponsableComponent,
    GestionCollaborateurComponent,
    AddEditResponsableComponent,
    AddEditCollaborateurComponent,
    CompetenceComponent,
    AddEditSkillsComponent,
    GererCompetenceComponent,
    AddCompetenceCollaborateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatSelectModule,
    NgbModalModule, TimepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['*'], // Replace with your domain
        disallowedRoutes: [] // Replace with your API URL
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
 
    MyGuardGuard
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
