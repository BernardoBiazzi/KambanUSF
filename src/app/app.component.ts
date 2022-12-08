import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.user == undefined) {
      this.router.navigate(['/login']);
    }

    if (localStorage.getItem('darkTheme') == 'on') {
      this.switchTheme();
    }
  }

  get currentTheme(): string {
    if (this.isLightTheme) return 'Claro';
    else return 'Escuro';
  }

  get isLightTheme(): boolean {
    return document.body.classList.contains('light');
  }

  get isDarkTheme(): boolean {
    return document.body.classList.contains('dark');
  }

  switchTheme(): void {

    if (document.body.classList.contains('light')) {

      document.body.classList.remove('light');
      document.body.classList.add('dark');
      document.querySelector("meta[name='theme-color']")?.setAttribute('content', '#252525');
      localStorage.setItem('darkTheme', 'on');

    } else {

      document.body.classList.add('light');
      document.body.classList.remove('dark');
      document.querySelector("meta[name='theme-color']")?.setAttribute('content', '#ffffff');
      localStorage.setItem('darkTheme', 'off');

    }

  }
}
