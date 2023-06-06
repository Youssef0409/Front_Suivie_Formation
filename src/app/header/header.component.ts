import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  nom!: string;
  prenom!: string;
  constructor(private router: Router,private authService: AuthService,private routes:Router) {}

  ngOnInit(): void { const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
     this.nom = user.nom;
     this.prenom = user.prenom;
     
    // Do something with the id_user value
    
  }}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
// Clear all items in local storage
//localStorage.clear();

  logout() {
    localStorage.clear();
    this.routes.navigate(['/login']);
    this.authService.logout().subscribe(
      () => {console.log("ggg")
        // Logout successful
      },
      (error) => {
        // Handle error
      }
    );
  }
}