import { Transaction } from './transaction.js';

export class Budget {
   
   constructor(year, month) {

      this.year = year;
      this.month = month;

      this.allTransactions = {
         inc: [],
         exp: [],
         itemPositions:[]
      }
   }

   /**
    * @param {object} obj A MonthlyBudget object serialized with JSON.stringify() and deserialized with JSON.parse(). 
    * @returns an instance of the MonthlyBudget Class. 
    */
   getBudget() {
      const { year, month, allTransactions } = this;

      //  Uses Array.reduce() to add up all the transactions of each type. 
      const   incomeTotal = allTransactions.inc.reduce((acc, transaction) => acc + transaction.value, 0);
      const expensesTotal = allTransactions.exp.reduce((acc, transaction) => acc + transaction.value, 0);
      
      return {
         month: month,
          year: year,
           inc: incomeTotal,
           exp: expensesTotal,
         total: incomeTotal - expensesTotal
      }
   }
   
   /**
    * @param {string} type accepts 'inc' or 'exp'.
    * @returns Total sum of transactions of the give type.
    */
   getTotalByType (type) {
      
      if(type != 'inc' && type != 'exp') {
         return false;
      }

      return this.allTransactions[type].reduce((acc, transaction) => acc + transaction.value, 0);
   }

   /**
    * @description Calculates percentages for budget total expenses vs total income, 
    * and the percentage of each transaction vs total income.
    */
   calcPercentages() {
      
      const { allTransactions } = this;
      const totalIncome = this.getTotalByType('inc');
      if(totalIncome === 0) {
         allTransactions.exp.map((item) => { item.percentage = 0 });
         return {
            globalPercentage: '---',
            all: allTransactions
         }
      }

      allTransactions.inc.map(transaction => {
         transaction.percentage = transaction.value / totalIncome * 100;
      });

      allTransactions.exp.map(transaction => {
         transaction.percentage = transaction.value / totalIncome * 100;
      });

      return {
         globalPercentage: this.getTotalByType('exp') / this.getTotalByType('inc') * 100,
         all: allTransactions
      }
   }

   /**
    * @returns A map containing percentages for all transactions
    */
   getPercentages() {

      let percentages = new Map();

      for (let type in this.allTransactions) {
         if (type === 'inc' || type === 'exp') {
            for (let transaction of this.allTransactions[type]) {
               percentages.set(`${transaction.type}-${transaction.id}`, transaction.percentage);
            }
         }
      }      
      return percentages;
   }

   addTransaction (type, description, value) {   
      // Generates an unique incremental ID for the new transaction of a given type.
      let id;
      if(this.allTransactions[type].length === 0) {
         id = 1;
      }
      else {
         id = this.allTransactions[type][this.allTransactions[type].length - 1].id + 1;
      }

      const transaction = new Transaction(id, type, description, value);
      
      this.allTransactions[type].push(transaction);
      this.allTransactions.itemPositions.push(`${type}-${transaction.id}`);
      this.calcPercentages();
      
      return transaction;
   }

   /**
    * @param {number} id 
    * @param {string} type 'inc' or 'exp'.
    * @description Removes a transaction from the list of transactions of a given type.
    */
   removeTransaction(id, type) {

      id = parseInt(id);
      let typeArr = this.allTransactions[type].filter(function (item) {
         return item.id !== id;
      });

      let positionsArr = this.allTransactions.itemPositions.filter(function (longID) {
         return longID !== `${type}-${id}`;
      });
      
      this.allTransactions[type] = typeArr;
      this.allTransactions.positionsArr = positionsArr;

      this.calcPercentages();
   }
}