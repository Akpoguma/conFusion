import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user ={ username:'', password: '', remember: false}
  constructor( public dialogRef: MatDialogRef<LoginComponent>){ }

  onSubmit(){
    console.log('User: ', this.user);
    this.dialogRef.close()

  }

}
