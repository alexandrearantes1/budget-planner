export class Transaction {

   constructor (id, type, description, value) {
      this.id = id;
      this.type = type;
      this.description = description;
      this.value = value;
      this.percentage = 0;
   }
   
   /**
    * @param {number} total Total income the percentage should be calculated against.
    * @description Updates the percentage of this instance of the Transaction. 
    */
   calcPercentage(total) {
      this.percentage = parseFloat(this.value) / total * 100;
   }
}