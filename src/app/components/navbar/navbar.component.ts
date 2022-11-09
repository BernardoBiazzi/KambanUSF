import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Table, TableService } from 'src/app/services/table.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faTrashAlt = faBars;
  public profilePicture: string = '';
  public user: SocialUser | undefined;
  public tables: Table[] = [];
  public navbarTitle: string = 'Workspace';

  constructor(private authService: AuthService,
    private router: Router,
    private tableService: TableService) { }

  ngOnInit() {
    this.setUserAndPicture();
    this.subscribeToAuthStateChanged();
    this.subscribeToTableChanges();
    this.subscribeToRouterEvents();
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

  // --------------------------------

  get tableId() {
    return parseInt(location.pathname.split('table/')[1]);
  }

  private subscribeToTableChanges() {
    this.tables = this.tableService.requestTables();
    this.tableService.tableChanges.subscribe((tables: Table[]) => {
      this.tables = tables;
    })
  }

  private subscribeToRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navbarTitle = this.tableService.getTableById(this.tableId)?.name || '';
      }
    });
  }

  toogleLeftBar(): void {
    if (document.getElementById('left-bar')?.classList.contains('show-left-bar')) {
      document.getElementById('left-bar')?.classList.add('hide-left-bar');
      document.getElementById('left-bar')?.classList.remove('show-left-bar');
    } else {
      document.getElementById('left-bar')?.classList.remove('hide-left-bar');
      document.getElementById('left-bar')?.classList.add('show-left-bar');
    }
  }

  addNewTable(): void {
    this.tableService.addNewTable('Nova tabela');
  }

}
