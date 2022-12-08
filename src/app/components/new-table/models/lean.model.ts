import { TaskList } from "src/app/models/taskList.model";

export const leanTaskLists: TaskList[] = [
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
