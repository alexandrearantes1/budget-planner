# Budget Planner

The Budget Planner is a personal budget tool designed to be a quick and straightfoward way to control personal finances without the hurdles of a spreadsheet. 

The app was designed with easy of use in mind, it is fully responsive to work on a variety of mobile devices and it was inspired by the Budgety Project from the JS course from https://codingheroes.io.

![Responsive Mockup](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/am-i-responsive.png)

## Project Goals

The goal of this project is to deliver a fully implemented and responsive front-end web application to help people who wish to better manage their finances, plan a budget for an event or party. 

The app was designed to be intuitive, easy and quick to use, displaying live updates to the budget as you add each transaction. 

## Target Audience

This web app was targeted to anyone interested in creating and/or managing a simple budget, based on income and expenses, where subcategories are not necessary. E.g. a personal monthly budget, a small event or a party budget.

## Features

The Budget Planner is divided into 3 main sections. The header contains the budget's summary displaying the current month, year, total income, total expenses and net income. The second section is a form that allow users to add transactions to the budget. The third section is the list of transactions dynamically generated based on user's input. 

### Existing Features

- __Summary__ 
  - The "Net Income", "Income", "Expenses", and expenses percentgage on the summary is updated everytime a transaction is added to or removed from the budget. The total expenses section of the summary includes a percentage box that displays what percentage of the total income the total expenses represent. The box is deactivated if the income is 0, since division by 0 is not possible. 

- __Form__
  - The form contains 4 elements: 
    - a toggle between income/expense.
    - an input text for the description.
    - an input text for the value.
    - a button to submit it.
  
  - __Validation:__
    - the description must contain at least 3 characters.
    - the value must be positive non-zero numbers between 0.01 and 999,999,999.99.

- __Transaction List__
  - The transaction list is displayed in reverse order, with the most recent item displayed at the top of the list.
  - The list header containing the text "Transactions" is only displayed when the list is not empty.
  
  - List Items
    - Each list item consists of 4 elements:  
      - description
      - value
      - percentage box (the percentage the current transaction represents against the total income)
      - a delete button to remove the transaction from the budget.
