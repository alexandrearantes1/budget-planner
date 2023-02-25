import { Budget } from './budget.js';
// import { UIController } from './ui-controller.js';

export class AppController {
   constructor () {
      this.budget = new Budget(2023, 1);
      this.budget.addTransaction('inc', 'Salary', 3000);
      this.budget.addTransaction('inc', 'pension', 2000);
      this.budget.addTransaction('exp', 'Rent', 1000);
      this.budget.addTransaction('exp', 'Loan', 300);
      // console.log();
   }

   init () {

   }
}

const app = new AppController();

app.init();