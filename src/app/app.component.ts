import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KambanUSF';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/login']);
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

    } else {

      document.body.classList.add('light');
      document.body.classList.remove('dark');
      document.querySelector("meta[name='theme-color']")?.setAttribute('content', '#ffffff');

    }

  }
}
