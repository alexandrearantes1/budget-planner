import { Budget } from './budget.js';
import { formatNumber, getElement } from './utils.js';

export class AppController {
   constructor (year, month) {
      
      this.DESC_MIN_CHARS = 3; 
      this.budget = new Budget(year, month);

      this.months = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "November", "December"];

      // List of all DOM elements for easy access in JS. 
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
      this.month     = getElement(this.DOM.month);
      this.netIncome = getElement(this.DOM.netIncome);
      this.income    = getElement(this.DOM.incomeValue);
      this.expenses  = getElement(this.DOM.expensesValue);
      this.pct       = getElement(this.DOM.expPct);
      
      // Transactions list
      this.header        = getElement(this.DOM.listHeader);
      this.listContainer = getElement(this.DOM.listContainer);
      this.list          = getElement(this.DOM.list);
   }

   setupListeners () {
      const { DOM } = this;
      
      // limits user input to numbers. 
      getElement(DOM.addItemValue).addEventListener('input', function () {
         this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      });

      getElement(DOM.addItemType).addEventListener('change', () => {

         // List of all form elements that must change color scheme.
         const elements = [
            getElement(DOM.addItemDesc),  
            getElement(DOM.addItemValue), 
            getElement(DOM.addItemButton)
         ];

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
      getElement(DOM.addItemButton).addEventListener('click',  () => {

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

     window.addEventListener('resize',  () => { this.onResize(); });
   }

   onResize () {

      if(window.innerWidth <= 768) {
         getElement(this.DOM.addItemButton).textContent = 'Add Transaction';
      }
      else {
         getElement(this.DOM.addItemButton).innerHTML = '&#x23CE;';
      }
   }

   addTransaction() {

      const { DOM } = this;

      const type        = getElement(DOM.addItemType).checked ? 'inc' : 'exp';
      const description = getElement(DOM.addItemDesc).value.toLowerCase();
      const value       = parseFloat(getElement(DOM.addItemValue).value);

      const transaction = this.budget.addTransaction( type, description, value );
      const id          = `${ type }-${ transaction.id }`;
      
      if(this.header.classList.contains('hidden')) {
         this.header.classList.remove('hidden');
      }

      // HTML node for each transaction.
      let node = `
         <div class="list-item transparent" id="${ id }">
            <div class="description">${ description }</div>
            <div class="value ${ type }-color"><span>${ formatNumber(value, type) }</span></div>
            <div class="pct ${ type }-pct">---</div>
            <button id="${ id }-delete-btn" class="item-delete-btn" aria-label="Delete item">
               <img src="assets/images/delete-btn.svg" alt="delete">
            </button>
         </div>`;
      
      this.list.insertAdjacentHTML('afterbegin', node);

      getElement(`#${ id }-delete-btn`).addEventListener('click', (event) => {
         
         const id = event.target.tagName.toLowerCase() === 'img' ? 
                    event.target.parentNode.parentNode.id : 
                    event.target.parentNode.id;
         
         if( id ) {
            this.removeTransaction(id);
         }
      });
      this.clearForm();
      this.updateBudget();
   }

   removeTransaction(id) {

      const shortID = id.substr(4, id.length-1);
      const type = id.substr(0, 3);

      // Remove transaction from the budget.
      this.budget.removeTransaction(shortID, type);

      // Remove transaction from the UI.
      const element = document.querySelector('#' + id);
      this.list.removeChild(element);
      
      // Hide "Transactions" heading if transaction list is empty. 
      if (!this.list.children.length) {
         this.header.classList.add('hidden');
      }

      this.updateBudget();   
   }

   updateBudget () {

      const { budget, netIncome, pct, income, expenses } = this;
      const percentages = budget.calcPercentages();
      
      // Change color of net income if positive or negative.
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

      // Update summary values.
      income.textContent = formatNumber(budget.getBudget().inc, 'inc');
      expenses.textContent = formatNumber(budget.getBudget().exp, 'exp');
      pct.textContent = formatNumber(percentages.globalPercentage, 'pct');
      
      this.togglePercentage(pct);

      // Update percentage for each income. 
      percentages.all.inc.map((item) => {
         getElement('#inc-' + item.id).children[2]
            .textContent = formatNumber(item.percentage, 'pct');

         this.togglePercentage(getElement('#inc-' + item.id).children[2]);
      });

      // Update percentage for each expense.
      percentages.all.exp.map((item) => {
         getElement('#exp-' + item.id).children[2]
            .textContent = formatNumber(item.percentage, 'pct');

         this.togglePercentage(getElement('#exp-' + item.id).children[2]);
      });
   }

   // Toggle opacity on percentage to 50% if value is 0 or invalid.
   togglePercentage(element) {
      element.style.opacity = element.textContent === '---' ? 0.5 : 1;
   }

   clearForm () {
      const { DOM } = this;

      getElement(DOM.addItemDesc).value = '';
      getElement(DOM.addItemValue).value = '';
      getElement(DOM.addItemDesc).focus();
   }

   changeType (type) {

      const { DOM } = this;

      const checkbox = getElement(DOM.addItemType);
      let state = checkbox.checked ? 'inc' : 'exp';

      if ( type != state ) {

         checkbox.checked = type === 'inc' ? true  : false;
         checkbox.dispatchEvent(new Event("change"));         
      }
   }

   validateForm () {

      const description = getElement(this.DOM.addItemDesc);
      const value = getElement(this.DOM.addItemValue);
      const parsedValue = parseFloat(value.value);

      if (description.value.length < this.DESC_MIN_CHARS) {
         
         description.focus();
         this.showAlert(`Description must have at least ${this.DESC_MIN_CHARS} characters.`, 5000);

      } else if( value.value.length === 0 ) {
         
         value.focus();
         this.showAlert('Value must have at least 1 digit', 5000);

      }
      else if (parsedValue < 0 || parsedValue > 999999999.99) {

         value.focus();
         this.showAlert('Value range must be between 0.01 and 999,999,999.99', 5000);

      } else {

         return true;
      }
      return false;
   }

   /**
    * @param {string} msg message to be displayed in the alert box.
    * @usage showAlert('this field is required') - displays the message for 3 seconds. 
    */
   showAlert (msg, duration = 5000) {

      const alertBox = getElement(this.DOM.alertBox);
      alertBox.textContent = msg;
      alertBox.style.display = 'block';
      
      setTimeout(() => {
         alertBox.style.display = 'none';
         alertBox.textContent = '';
      }, duration);
   }

   init () {
      window.addEventListener('load', () => { 
         this.setupListeners(); 
         this.onResize(); 
      });
      this.month.textContent = `${ this.months[this.budget.month] } ${ this.budget.year }`;
   }
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const app = new AppController(year, month);
app.init();