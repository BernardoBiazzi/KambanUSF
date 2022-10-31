import { Injectable } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public profilePicture: string = '';
  public user: SocialUser | undefined = undefined;
  public authStateChanged: Subject<any> = new Subject();

  constructor(private socialAuthService: SocialAuthService) {
    this.user = this.getAccess();
    this.subscribeToAuthState();
    this.setProfilePicture();
  }

  private subscribeToAuthState(): void {
    this.socialAuthService.authState.subscribe((socialUser: SocialUser) => {
      if (socialUser) {
        this.setAccess(socialUser);
      } else {
        this.removeAccess();
      }
      this.authStateChanged.next();
    });
  }

  singInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).catch((error) => {
      console.log(error);
    });
  }

  singInWithGoogle(): void {
    alert('Login com Google temporáriamente indisponível');
  }

  singOut(): void {
    this.socialAuthService.signOut().catch(() => {
      this.removeAccess();
    });
  }

  private getAccess() {
    const access = localStorage.getItem('access');
    if (access != undefined) return JSON.parse(access) as SocialUser;
    return undefined;
  }

  private setAccess(access?: SocialUser) {
    this.user = access;
    this.setProfilePicture();
    this.authStateChanged.next();
    if (access == undefined) return localStorage.removeItem('access');
    localStorage.setItem('access', JSON.stringify(access));
  }

  private removeAccess(): void {
    this.setAccess(undefined);
  }

  private setProfilePicture(): void {
    if (this.user) this.profilePicture = this.getHigherResPicture(this.user.response.picture.data.url);
    else this.profilePicture = 'https://cdn-icons-png.flaticon.com/512/147/147133.png';
  }

  private getHigherResPicture(url: string): string {
    const idPicture = url.split('asid=')[1].split('&height')[0];
    return `http://graph.facebook.com/${idPicture}/picture?type=large`
  }
}
