import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { faBars, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Table, TableService } from 'src/app/services/table.service';
import { TaskService } from 'src/app/services/task.service';
import { TaskList } from 'src/app/models/taskList.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faBars = faBars;
  faTrashAlt = faTrashAlt;
  public profilePicture: string = '';
  public user: SocialUser | undefined;
  public tables: Table[] = [];
  public navbarTitle: string = 'Workspace';

  constructor(private authService: AuthService,
    private router: Router,
    private tableService: TableService,
    private taskService: TaskService) { }

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
    const tableId = this.tableService.addNewTable('Nova tabela');
    this.router.navigate([`./table/${tableId}`]).then(() => {
      const kanbanTaskLists: TaskList[] = [
        {
          id: 0,
          title: '🗃 Backlog',
          borderColor: '#A1A1A1',
          tasks: [],
          info: {
            img: 'https://assets.website-files.com/634681057b887c6f4830fae2/6367dd64ca5ec416afc168bf_6259f75b8de99cf74c178f56_product-backlog.png',
            text: 'Essa lista é onde as tarefas de projetos são alocadas em cartões individuais. A lista também reúne tarefas que o time pode querer trabalhar ou nas quais precisará trabalhar no futuro, mas que ainda estão sendo avaliadas.'
          }
        },
        {
          id: 0,
          title: '🖊 inDev',
          borderColor: '#3490DC',
          tasks: [],
          info: {
            img: 'https://media.istockphoto.com/id/1380612424/pt/vetorial/hybrid-work-place.jpg?b=1&s=170667a&w=0&k=20&c=F-fhtlmmag-XcjDzKHWLKlhqZoGhivyWWWCjnbAxV-M=',
            text: 'Essa lista é onde as tarefas que você estiver atuando no momento devem ser alocadas em cartões individuais.'
          }
        },
        {
          id: 0,
          title: '🖥 Code Review',
          borderColor: '#F6993F',
          tasks: [],
          info: {
            img: 'https://trungtq.com/wp-content/uploads/2020/11/code-review-best-practices.png',
            text: 'Code review consiste na prática de fazer revisões no código. Logo, após o término do desenvolvimento a tarefa deve ser alocada em code review para que ela seja revisada, caso problemas sejam encontrados a tarefa deve voltar para desenvolvimento'
          }
        },
        {
          id: 0,
          title: '🚀 Ready To Deploy',
          borderColor: '#9561E2',
          tasks: [],
          info: {
            img: 'https://lh5.googleusercontent.com/w23wL0OaGsmU4jjyPiBcAGVh2R6dwodWiMRQn9FMjvjkYcC-MtEhnNwpOvKkaSh3SdPpZOqjbwfWrm5ij-R9YQ8Z2dbUN7KMs04BNMI5pTzmsRFgYIn7WlfGfaqVm5Up3it-hGyR',
            text: 'Fazer um deploy, em termos práticos, significa colocar no ar alguma aplicação que teve seu desenvolvimento concluído, logo todas as tarefas cujo desenvolvimento foi concluido e estão aptas para ir ao ar devem ser alocadas nessa lista.'
          }
        },
        {
          id: 0,
          title: '✅ Concluídas',
          borderColor: '#38C172',
          tasks: [],
          info: {
            img: 'https://global-uploads.webflow.com/5f16d69f1760cdba99c3ce6e/61f3b6c08d3ab877379b3886_Design%20thinking%20vs%20agile%20(1).png',
            text: 'Todas as tarefas que já tenham sido concluídas devem ser alocadas nessa lista de tarefas'
          }
        }
      ];

      kanbanTaskLists.forEach((taskList) => {
        this.taskService.addNewTaskList(taskList);
      });

      this.toogleLeftBar();
    });
  }

  deleteTable(table: Table): void {
    this.tableService.deleteTable(table);
  }

}
