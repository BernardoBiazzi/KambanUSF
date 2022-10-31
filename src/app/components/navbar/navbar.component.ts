import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public profilePicture: string = '';
  public user: SocialUser | undefined;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.setUserAndPicture();
    this.subscribeToAuthStateChanged();
  }

  public goToUserProfile() {
    this.router.navigate(['./login']);
  }

  private setUserAndPicture() {
    this.user = this.authService.user;
    this.profilePicture = this.authService.profilePicture;
  }

  private subscribeToAuthStateChanged() {
    this.authService.authStateChanged.subscribe(() => {
      this.setUserAndPicture();
    });
  }

}
