import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { TableService } from 'src/app/services/table.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public profilePicture: string = '';
  public user: SocialUser | undefined;

  constructor(private authService: AuthService,
    private tableService: TableService,
    private router: Router) { }

  ngOnInit() {
    this.setUserAndPicture();
    this.subscribeToAuthStateChanged();
  }

  singInWithFacebook() {
    this.authService.singInWithFacebook();
  }

  singInWithGoogle() {
    this.authService.singInWithGoogle();
  }

  singOut() {
    this.authService.singOut();
  }

  goToWorkspace() {
    const table = this.tableService.requestTables()[0];
    this.router.navigate([`/table/${table.id}`]);
  }

  private subscribeToAuthStateChanged() {
    this.authService.authStateChanged.subscribe(() => {
      this.setUserAndPicture();
    });
  }

  private setUserAndPicture() {
    this.user = this.authService.user;
    this.profilePicture = this.authService.profilePicture;
  }

}
