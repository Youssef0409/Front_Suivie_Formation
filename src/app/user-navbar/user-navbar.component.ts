import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  
  isMenuOpen = false;
  nom: any;
  prenom: any;

  constructor(private router: Router,private elementRef: ElementRef, private renderer: Renderer2,private authService: AuthService,private routes:Router) {}

  toggleMenu() {
    const subMenu = this.elementRef.nativeElement.querySelector('#subMenu');

    if (this.isMenuOpen) {
      this.renderer.removeClass(subMenu, 'open-menu');
    } else {
      this.renderer.addClass(subMenu, 'open-menu');
    }

    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
       this.nom = user.nom;
       this.prenom = user.prenom;
       
      // Do something with the id_user value
      
    }
    
  }

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

  goToListeFormation(): void {
    this.routes.navigate(['/user/profile']);
  }

}
