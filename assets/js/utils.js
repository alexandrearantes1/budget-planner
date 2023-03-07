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
   
   // Formatting numbers based on the REGEX solution proposed by Scaramouche 
   // here: https://stackoverflow.com/questions/49261076/applying-currency-format-using-replace-and-a-regular-expression
   // to insert ',' every 3 digits and '.' before the decimal if needed.
   number = number.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1,');
   
   // return the number with a "+" or "-" sign depending on type (inc / exp / pct)
   return  (type === 'exp'? '-' : '+') + number;
}


/**
 * @param {string} id or class of the element.
 * @returns the Node containing the given id or class (returns the first node occurence if multiple elements contain the same class name). 
 */
export function getElement (identifier) {
   return document.querySelector(identifier);
}