import { Budget } from './budget.js';
// import { UIController } from './ui-controller.js';

export class AppController {
   constructor (year, month) {
      
      this.DESC_MIN_CHARS = 3; 
      this.budget = new Budget(year, month);

      this.DOM = {
                  month: '#month',
              netIncome: '#net-income',
            incomeValue: '#income-value',
          expensesValue: '#expenses-value',
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
      this.month     = $(this.DOM.monthValue);
      this.netIncome = $(this.DOM.netIncome);
      this.income    = $(this.DOM.incomeValue);
      this.expenses  = $(this.DOM.expensesValue);
      this.pct       = $(this.DOM.expensesPct);
      
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

         // List of all elements that must change color scheme.
         const elements = document.querySelectorAll(DOM.addItemDesc + ',' + DOM.addItemValue + ',' + DOM.addItemButton);

         for ( let element of elements ) {
            
            // Toggle :hover classes for "Add" button to change its background color   
            if(element.tagName.toLowerCase() === 'button') {
               element.classList.toggle('red-btn');
               element.classList.toggle('green-btn');
            }

            // Toggle the classes green / red for all elements
            element.classList.toggle('green');
            element.classList.toggle('red');
         }
         elements[0].focus();
      });
      
      $(DOM.addItemButton).addEventListener('click',  () => {
         if( this.validateForm() ) {
            this.addTransaction();
         }
      });

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
      const value = $(DOM.addItemValue).value;

      const transaction = this.budget.addTransaction( type, description, value );
      const id = `#${ type }-${ transaction.id }`;
      
      if(this.header.classList.contains('hidden')) {
         this.header.classList.remove('hidden');
      }

      // HTML node for each transaction.
      let node = `
         <div class="list-item transparent" id="${ type }-${ transaction.id }">
            <div class="description">${ description }</div>
            <div class="value ${ type }-color"><span>${ formatNumber(value, type) }</span></div>
            <div class="pct ${ type }-pct">---</div>
            <button id="${ type }-${ transaction.id }-delete-btn" class="item-delete-btn" aria-label="Delete item"><img src="assets/images/delete-btn.svg" alt="delete"></button>
         </div>`;
      
      this.list.insertAdjacentHTML('afterbegin', node);

   }

   init () {
      window.addEventListener('load', () => { this.setupListeners() });
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
         this.showAlert(`Description must have at least ${this.DESC_MIN_CHARS} characters.`, description);

      } else if( value.value.length === 0 ) {
         
         value.focus();
         this.showAlert('Value must have at least 1 digit', value);

      } else {

         return true;
      }
      return false;
   }

   showAlert (msg) {

      const alertBox = $(this.DOM.alertBox);
      alertBox.textContent = msg;
      alertBox.style.display = 'block';
      
      setTimeout(() => {
         alertBox.style.display = 'none';
         alertBox.textContent = '';
      }, 3000);
   }
}

function formatNumber (number, type = '') {

   
   if(parseFloat(number) === 0) {
      return '0.00';
   }
   
   // convert to absolute float with 2 decimal places. 
   number = Math.abs(parseFloat(number)).toFixed(2).toString();
   
   // Formatting numbers based on the REGEX solution proposed by Scaramouche 
   // here: https://stackoverflow.com/questions/49261076/applying-currency-format-using-replace-and-a-regular-expression
   // to insert ',' every 3 digits and '.' before the decimal if needed.
   number = number.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1,');
   
   // return the number with a "+" or "-" sign depending on type (inc / exp)
   return  (type === 'exp'? '- ' : '+ ') + number;
}

function $(identifier) {
   return document.querySelector(identifier);
}

const date = new Date();
const year = date.getFullYear();
const month = date.getFullYear();
const app = new AppController(year, month);
app.init();