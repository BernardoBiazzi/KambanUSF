import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
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
    this.router.navigate(['/table']);
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
