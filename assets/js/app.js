import { Budget } from './budget.js';
// import { UIController } from './ui-controller.js';

export class AppController {
   constructor (year, month) {
      

      this.DESC_MIN_CHARS = 3; 
      this.budget = new Budget(year, month);

      this.months = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "November", "December"];

      this.DOM = {
                  month: '#month',
              netIncome: '#net-income',
            incomeValue: '#income-value',
          expensesValue: '#expenses-value',
                 expPct: '#exp-pct',
            addItemType: '#type',
            addItemDesc: '#add-item-desc',
           addItemValue: '#add-item-value',
          addItemButton: '#add-item-button',
         alertContainer: '#alert-container',
               alertBox: '#alert-box',
          listContainer: '#list-container', 
             listHeader: '#list-header',
                   list: '#list',
      };

      // storing up html elements to be used accross the class. 
      // Summary box
      this.month     = $(this.DOM.month);
      this.netIncome = $(this.DOM.netIncome);
      this.income    = $(this.DOM.incomeValue);
      this.expenses  = $(this.DOM.expensesValue);
      this.pct       = $(this.DOM.expPct);
      
      // Transactions list
      this.header        = $(this.DOM.listHeader);
      this.listContainer = $(this.DOM.listContainer);
      this.list = $(this.DOM.list);
   }

   setupListeners () {
      const { budget, DOM } = this;
      
      // limits user input to numbers. 
      $(DOM.addItemValue).addEventListener('input', function () {
         this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      });

      $(DOM.addItemType).addEventListener('change', (event) => {

         // List of all form elements that must change color scheme.
         const elements = [$(DOM.addItemDesc),  $(DOM.addItemValue), $(DOM.addItemButton)];

         for ( let element of elements ) {
            
            // Toggle :hover classes for "Add" button to change its background color   
            if(element.tagName.toLowerCase() === 'button') {
               element.classList.toggle('red-btn');
               element.classList.toggle('green-btn');
            }

            // Toggle the classes green / red for all form elements
            element.classList.toggle('green');
            element.classList.toggle('red');
         }
         elements[0].focus();
      });
      
      // Listener for click on addItemButton
      $(DOM.addItemButton).addEventListener('click',  () => {
         if( this.validateForm() ) {
            this.addTransaction();
         }
      });

      // Listener for keyboard controls 
      document.addEventListener('keydown', (event) => {

         if( event.code === 'ArrowUp' || event.code === 'ArrowUp' ) {

            this.changeType('inc');
         }
         else if( event.code === 'ArrowDown' || event.key === 'ArrowDown' ) {

            this.changeType('exp');
         } 
         else if ( event.code === 'Enter' || event.key === 'Enter' ) {

            if( this.validateForm() ) {

               this.addTransaction();
            }
         }
     });
   }

   addTransaction() {

      const { DOM } = this;

      const type = $(DOM.addItemType).checked ? 'inc' : 'exp';
      const description = $(DOM.addItemDesc).value;
      const value = parseFloat($(DOM.addItemValue).value);

      const transaction = this.budget.addTransaction( type, description, value );
      const id = `${ type }-${ transaction.id }`;
      
      if(this.header.classList.contains('hidden')) {
         this.header.classList.remove('hidden');
      }

      // HTML node for each transaction.
      let node = `
         <div class="list-item transparent" id="${ id }">
            <div class="description">${ description }</div>
            <div class="value ${ type }-color"><span>${ formatNumber(value, type) }</span></div>
            <div class="pct ${ type }-pct">---</div>
            <button id="${ id }-delete-btn" class="item-delete-btn" aria-label="Delete item"><img src="assets/images/delete-btn.svg" alt="delete"></button>
         </div>`;
      
      this.list.insertAdjacentHTML('afterbegin', node);

      $(`#${ id }-delete-btn`).addEventListener('click', (event) => {
         
         const id = event.target.tagName.toLowerCase() === 'img' ? 
                    event.target.parentNode.parentNode.id : 
                    event.target.parentNode.id;
         
         if( id ) {
            this.removeTransaction(id);
         }
      });
      this.clearForm();
      this.displayPercentages();
   }

   removeTransaction(id) {

      const shortID = id.substr(4, id.length-1);
      const type = id.substr(0, 3);

      this.budget.removeTransaction(shortID, type);

      const element = document.querySelector('#' + id);
         this.list.removeChild(element);
      
      if (!this.list.children.length) {
   
         this.header.classList.add('hidden');
      }
      this.displayPercentages();   
   }

   displayPercentages () {
      const { budget, netIncome, pct, income, expenses } = this;
      const percentages = budget.calcPercentages();

      if (budget.getBudget().total >= 0) {
         netIncome.textContent = formatNumber(budget.getBudget().total, 'inc');
         netIncome.classList.add('inc-color');
         netIncome.classList.remove('exp-color');
      }
      else {
         netIncome.textContent = formatNumber(budget.getBudget().total, 'exp');
         netIncome.classList.add('exp-color');
         netIncome.classList.remove('inc-color');
      }

      income.textContent = formatNumber(budget.getBudget().inc, 'inc');
      expenses.textContent = formatNumber(budget.getBudget().exp, 'exp');
      pct.textContent = formatNumber(percentages.globalPercentage, 'pct');
      
      this.togglePercentage(pct);

      percentages.all.inc.map((item) => {
         $('#inc-' + item.id).children[2].textContent = formatNumber(item.percentage, 'pct');
         this.togglePercentage($('#inc-' + item.id).children[2]);
      });

      percentages.all.exp.map((item) => {
         $('#exp-' + item.id).children[2].textContent = formatNumber(item.percentage, 'pct');
         this.togglePercentage($('#exp-' + item.id).children[2]);
      });
   }

   togglePercentage(element) {
      element.style.opacity = element.textContent === '---' ? 0.5 : 1;
   }

   clearForm () {
      const { DOM } = this;

      $(DOM.addItemDesc).value = '';
      $(DOM.addItemValue).value = '';
      $(DOM.addItemDesc).focus();
   }

   init () {
      window.addEventListener('load', () => { this.setupListeners() });
      this.month.textContent = this.months[this.budget.month];
   }

   changeType (type) {

      const { DOM } = this;

      const checkbox = $(DOM.addItemType);
      let state = checkbox.checked ? 'inc' : 'exp';

      if ( type != state ) {

         checkbox.checked = type === 'inc' ? true  : false;
         checkbox.dispatchEvent(new Event("change"));         
      }

   }

   validateForm () {

      const description = $(this.DOM.addItemDesc);
      const value = $(this.DOM.addItemValue);

      if (description.value.length < this.DESC_MIN_CHARS) {

         description.focus();
         this.showAlert(`Description must have at least ${this.DESC_MIN_CHARS} characters.`, 3000);

      } else if( value.value.length === 0 ) {
         
         value.focus();
         this.showAlert('Value must have at least 1 digit', 3000);

      } else {

         return true;
      }
      return false;
   }

   /**
    * 
    * @param {string} msg message to be displayed in the alert box.
    * @usage showAlert('this field is required') - displays the message for 3 seconds. 
    */
   showAlert (msg, duration = 3000) {

      const alertBox = $(this.DOM.alertBox);
      alertBox.textContent = msg;
      alertBox.style.display = 'block';
      
      setTimeout(() => {
         alertBox.style.display = 'none';
         alertBox.textContent = '';
      }, duration);
   }
}

/**
 * @param {number} n to be formatted as currency.
 * @param {string} type 'inc' | 'exp' type of the transaction being formatted. Default is ''. 
 * @returns a formatted string representation of the number passed in the paramenter.
 * @usage formatNumber (3000, 'inc') returns '+3,000.00'.
 */
function formatNumber (n, type = '') {

   if(type === 'pct') { 
      return parseFloat(n) > 0 ? parseFloat(n).toFixed(1) + '%' : '---';
   }

   if(parseFloat(n) === 0) {
      return '0.00';
   }
   
   // convert to absolute float with 2 decimal places. 
   let number = Math.abs(parseFloat(n)).toFixed(2).toString();
   
   // Formatting numbers based on the REGEX solution proposed by Scaramouche 
   // here: https://stackoverflow.com/questions/49261076/applying-currency-format-using-replace-and-a-regular-expression
   // to insert ',' every 3 digits and '.' before the decimal if needed.
   number = number.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1,');
   
   // return the number with a "+" or "-" sign depending on type (inc / exp / pct)
   return  (type === 'exp'? '-' : '+') + number;
}

/**
 * @param {String identifier} id or class of the element.
 * @returns the Node containing  the given id or class (returns the first node occurence in cases of multiple elements containing the same class name). 
 */
function $(identifier) {
   return document.querySelector(identifier);
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const app = new AppController(year, month);
app.init();