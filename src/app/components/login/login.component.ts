import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public picture: string = 'https://www.businessnetworks.com/sites/default/files/default_images/default-avatar.png';
  public socialUser!: any;

  constructor(private authService: SocialAuthService,
    private router: Router) { }

  ngOnInit() {
    this.socialUser = this.getAccess();
    this.setPictureUrl();
    this.subscribeToAuthState();
  }

  subscribeToAuthState(): void {
    this.authService.authState.subscribe((socialUser: SocialUser) => {
      if (socialUser) {
        this.socialUser = socialUser;
        this.setAccess(socialUser);
        this.setPictureUrl();
      } else {
        this.removeAccess();
      }
    });
  }

  setPictureUrl(): void {
    if (this.socialUser) this.picture = this.socialUser.response.picture.data.url;
    else this.picture = 'https://www.businessnetworks.com/sites/default/files/default_images/default-avatar.png';
  }

  loginComFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).catch((error) => {
      console.log(error);
    });
  }

  loginComGoogle(): void {
    alert('Login com Google temporáriamente indisponível');
  }

  singOut(): void {
    this.authService.signOut().catch(() => {
      this.removeAccess();
    });
  }

  removeAccess(): void {
    this.setAccess(undefined);
    this.socialUser = undefined;
    this.setPictureUrl();
  }

  goToWorkspace(): void {
    this.router.navigate(['/table']);
  }

  getAccess() {
    const access = localStorage.getItem('access');
    if (access != undefined) return JSON.parse(access) as SocialUser;
    return undefined;
  }

  setAccess(access?: SocialUser) {
    if (access == undefined) return localStorage.removeItem('access');
    localStorage.setItem('access', JSON.stringify(access));
  }
}
