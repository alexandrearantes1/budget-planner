/**
 * @param {number} n to be formatted as currency.
 * @param {string} type 'inc' | 'exp' type of the transaction being formatted. Default is ''. 
 * @returns a formatted string representation of the number passed in the paramenter.
 * @usage formatNumber (3000, 'inc') returns '+3,000.00'.
 */
export function formatNumber (n, type = '') {

   if(type === 'pct') { 
      return parseFloat(n) > 0 ? parseFloat(n).toFixed(1) + '%' : '---';
   }

   if(parseFloat(n) === 0) {
      return '0.00';
   }
   
   // convert to absolute float with 2 decimal places. 
   let number = Math.abs(parseFloat(n)).toFixed(2).toString();
   
   number = number.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1,');
   
   // return the value with a "+" or "-" sign depending on type (inc / exp)
   return  number;
}


/**
 * @param {string} id or class of the element.
 * @returns the html node containing the given id or class (returns the first node occurence if multiple elements contain the same class name). 
 */
export function getElement (identifier) {
   return document.querySelector(identifier);
}