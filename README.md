# Budget Planner

The Budget Planner is a personal budget tool designed to be a quick and straightfoward way to control personal finances without the hurdles of a spreadsheet. 

The app was designed with easy of use in mind, it is fully responsive to work on a variety of mobile devices and it was inspired by the Budgety Project from the JS course from https://codingheroes.io.

![Responsive Mockup](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/am-i-responsive.png)

## Project Goals

The goal of this project is to deliver a fully implemented and responsive front-end web application to help people who wish to better manage their finances, plan a budget for an event or party. 

The app was designed to be intuitive, easy and quick to use, displaying live updates to the budget as you add each transaction, making it clear the participation of each expense on the total budget compared to the income, as well as the participation of different sources of income.  

## Target Audience

This web app was targeted to anyone interested in creating and/or managing a simple budget, based on income and expenses, where subcategories are not necessary. E.g. a personal monthly budget, a small event or a party budget.

## Features

The Budget Planner is divided into 4 main sections. The header contains the logo and the budget's summary displaying the current month, year, total income, total expenses and net income. The second section is a form that allow users to add transactions to the budget. The third section is the list of transactions dynamically generated based on user's input. The fourth section is a footer with a github link. 

### Existing Features

- __The Summary__ 
  - The "Net Income", "Income", "Expenses", and expenses percentgage on the summary is updated everytime a transaction is added to or removed from the budget. The total expenses section of the summary includes a percentage box that displays what percentage of the total income the total expenses represent. The box is deactivated if the income is 0, since division by 0 is not possible. 
 
![Summary](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/summary.png)

- __The Form__
  - The form contains 4 elements: 
    - Toggle button to choose between income and expense.
    - Input text for the description.
    - Input text for the value.
    - Button to submit it.
  
  - __Validation:__
    - Description must contain at least 3 characters.
    - Value must be positive non-zero numbers between 0.01 and 999,999,999.99.

![Form](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/form.png)


- __The Transaction List__
  - The transaction list is displayed in reverse order, with the most recent item displayed at the top of the list.
  - The list header containing the text "Transactions" is only displayed when the list is not empty.

![Transaction List](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/list.png)

  - List Items
    - Each list item consists of 4 elements:  
      - description
      - value
      - percentage box (the percentage the current transaction represents against the total income)
      - a delete button to remove the transaction from the budget.

  ![List Items](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/list-items.png)

- __The Footer__
  - The footer contains a github icon linked to the project's repository that opens in a new tab. When the user passes the mouse over the github icon it scales up to attract the user's attention.

![Footer](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/footer.png)

### Features Left to Implement
 - In the future, a user account could be implemented in order to preserve user's past budgets, as well as the possibility of accessing user's budget from different devices. The app was designed with this feature in mind, and all budget's information is stored in the Budget Object.
- The ability to edit an existing transaction could be implemented removing the need to delete and recreate a transaction that contains wrong information.
- Add a predictive text input would be beneficial to speed up data entry. 

## Testing
- The app was tested using a MacBook Pro 13" on Chrome, Firefox, Safari and Microsoft Edge as well as on a Google Pixel 5 Pro using Chrome. 
 
- On large screens (above 768px wide):
  - The summary, form and list are centered on the screen. The logo is placed to the left of the summary. 
  - The form is contained in a single line, the description box is larger than the value box and the submit button displays an icon representing a keyboard's "enter" key.
  - The transaction list displays each transaction's description, value and a percentage box. The delete button is hidden. When the user passes the mouse over a transaction, the value and percentage box slides to the left revealing the delete button.
  - The footer is fixed at the bottom of the screen. As the list grows, it will be hidden behind the footer with a slight transparent gradient
 
- On small screens (below or equal to 768px wide):
  - The summary is compressed in size (reduced font sizes and boxes paddings are applied). The summary is no longer centered at the screen, instead the whole header content is centered (summary + logo) to prevent the logo from going off screen in small screen devices.
  - The form is broken into 4 lines, one for each element to make it easier to click on each element when using smartphones. The toggle button is now centered. The text fields and the submit button are resized to 90% the size of the screen and the submit button displays the label "Add Transaction" instead of the "enter" icon. 
  - The transaction list is now expanded to take 100% of the screen width. The fonts are slightly larger and the delete button is no longer hidden. 

### Interactivity Test
- Scenario 1:
  1. Navigate to [Budget Planner](https://alexandrearantes1.github.io/budget-planner/)
  2. Enter the following data on the form:
     -Description: Salary
     -Value: 2000
  3. Click the button to add the transaction, or press "Enter" on your keyboard.
  4. Click on the "income/expense" toggle button to change to "expense" or press "Arrow Down" on the keyboard.
  5. Enter the following data:
     -Description: Rent
     -Value: 750
  6. Click on the button to submit it, or press "Enter" on the keyboard. 
  
- Expected: The app displays the two items on the list:
  - Salary - 2,000.00 - 100.0%
  - Rent   -   750.00 -  37.5%
  The budget summary is updated with every entry, with the first entry, it displays the total income of 2,000.00 and net income of 2,000.00. After the second entry, it displays the total expenses of 750.00 and the percentage 37.5% next to it. The net income displayed is now 1,250.00

- Actual: the app behaves as expected. Each additional transaction updates the budget summary and recalculates and display the updated percentages for all items on the list. 

- Scenario 2:
  1. Navigate to [Budget Planner](https://alexandrearantes1.github.io/budget-planner/)
  2. Add a few transactions following the steps outlined on Scenario 1.
  3. Move the mouse over one of the transactions.
   
   
   
