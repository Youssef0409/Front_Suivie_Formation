import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/register-request';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormationserviceService } from 'src/app/services/formationservice/formationservice.service';
import { formatDate } from '@angular/common';
import { ResponsableService } from 'src/app/services/responsable.service';
import { ResponsableRequest } from 'src/app/models/ResponsableRequest';


@Component({
  selector: 'app-add-edit-responsable',
  templateUrl: './add-edit-responsable.component.html',
  styleUrls: ['./add-edit-responsable.component.scss']
})
export class AddEditResponsableComponent {
  editmode: boolean = false;
  editdata: any;
  respdata: any;
  ListResponsable: any = [];
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService ,  
    private routes:Router,private authService: ResponsableService, private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public d: any,
    public dialogRef: MatDialogRef<AddEditResponsableComponent>) {}
    registerRequest: ResponsableRequest = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: Role.Responsable,
     
      grade: '',
      specialite:'',
    };
    DataResponse :any;  
   
    showSuccessMessage() {
      const config = new MatSnackBarConfig();
      config.duration = 3000; // Duration in milliseconds
      config.horizontalPosition = 'center'; // Set the horizontal position to center
      config.verticalPosition = 'top'; // Set the vertical position to top
  
      this.snackBar.open('Registration succeeded!', 'Close', config);
    }
    showFailMessage() {
      
      const config = new MatSnackBarConfig();
      config.duration = 3000; // Duration in milliseconds
      config.horizontalPosition = 'center'; // Set the horizontal position to center
      config.verticalPosition = 'top'; // Set the vertical position to top
  
      this.snackBar.open('Registration failed!', 'Close', config);
    }
    register() {
      this.authService.register(this.registerRequest)
        .subscribe(
          (response: any) => {
            // Handle successful registration response
           
            this.respdata = response;
            this.showSuccessMessage();
            if (this.respdata) {
              this.dialogRef.close();
              
              
            } location.reload();
            // Redirect or perform further actions
            // e.g., navigate to a protected route
          },
          (error: any) => {
            this.showFailMessage();
            // Handle error response
            console.error('Registration failed:', error);
          }
        );
    }
  
}
