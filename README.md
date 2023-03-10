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

The Budget Planner is divided into 4 main sections. 
1. The header contains the logo and the budget's summary with the following information:
   - Current Month and Year.
   - Net Income.
   - Total Income.
   - Total Expenses.
3. A form allowing users to add transactions to the budget. 
4. The transactions list, dynamically generated based on user's input. 
5. The footer containing a link to the github repository of the app.

### Existing Features

- __The Header__ 
  - The Header contains a background image, the logo and the budget's summary. On the summary "Net Income", "Income", "Expenses", and expenses percentgage are updated everytime a transaction is added to or removed from the budget. The total expenses section of the summary includes a percentage box that displays what percentage of the total income the total expenses represent. The box is deactivated if the income is 0, since division by 0 is not possible. 
 
![Header](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/header.png)

- __The Form__
  - The form contains 4 elements: 
    1. Toggle button to choose between income and expense.
    2. Input text for the description.
    3. Input text for the value.
    4. Button to submit it.
  
  - __Validation:__
    - Description must contain at least 3 characters.
    - Value must be positive non-zero numbers between 0.01 and 999,999,999.99.
  
  - Tooltip
    - A tooltip was implemented when the user passes the mouse over the toggle button or the submit button to inform the user that a keyboard shortcut is available in order to speed up the data entry process.

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

  ![List Items](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/list-item.png)

- __The Footer__
  - The footer contains a github icon linked to the project's repository that opens in a new tab. When the user passes the mouse over the github icon it scales up to attract the user's attention.

![Footer](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/footer.png)

### Features Left to Implement
- In the future, a user account could be implemented in order to preserve user's past budgets, as well as the possibility of accessing user's budget from different devices. The app was designed with this feature in mind, and all budget's information is stored in the Budget Object.
- The ability to edit an existing transaction could be implemented removing the need to delete and recreate a transaction that contains wrong information.
- Add a predictive text input would be beneficial to speed up data entry. 

## Technologies

- HTML
  - The structure of the web app was developed using HTML5. 
- CSS
  - The layout was styled using CSS3. 
  - CSS variables were widely used to make it easy to change color scheme, animation curve, border thickness, etc.
- Javascript 
  - JavaScript ES6 was used to add interactivity to the app.
- IDE - Visual Studio Code
  - The app was developed using the latest version of Visual Studio Code (1.70.2).
- Git 
  - Used to backup and document the development process.
- GitHub
  - The source code is hosted on GitHub and deployed using GitHub Pages.
- Design
  - The logo was designed using [FreeLogoDesign](https://www.freelogodesign.org/).
- Image Crop
  - [Image Crop](https://www.iloveimg.com/crop-image) was used to crop images.
- Convertio 
  - [Convertio](https://convertio.co/png-webp/) was used to convert images from PNG to WEBP.
- Favicon.io
  - [Favicon.io](https://favicon.io/favicon-generator/) was used to generate a favicon. 

## Testing

### Responsiveness

The web app responsiveness was tested using the [https://responsivedesignchecker.com/](https://responsivedesignchecker.com/) on a variety of resolutions.

Here are a few examples:

320x480:
![RDC - 320x480](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/rdc-320.png)
768x1024:
![RDC - 768x1024](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/rdc-768.png)
1366x1024:
![RDC - 1366x1024](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/rdc-1366.png)
1600x900:
![RDC - 1600x900](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/rdc-1600.png)

### Accessibility

- All form elements contain labels and / or aria-labels to be read out by screen readers. 
- Color contrasts meet the minimum contrast ratio indicated by the Lighthouse from the devtools.
- Semantic HTML was used to create the structure of the app.
- All non-textual elements relevant to users contain aria-label to ensure screen readers are effective. 
- HTML page lang attribute is set to "en".

Wave Web Accessibility Evaluation Tool Report:


### Lighthouse report

#### Desktop
![Lighthouse - Desktop](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/lighthouse-desktop.png)

#### Mobile
![Lighthouse - Mobile](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/lighthouse-mobile.png)

### Functional Testing

_Scenario 1 - Correct input_
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
  
Expected:
1. After the first transaction is added, it shows the heading "Transactions" below the form and adds the transaction to the list. On the summary it shows the total income of 2,000.00 and net income of 2,000.00.
2. After the second transaction is entered, the app adds it to the list. On the summary it shows the total expenses of 750.00 and the percentage 37.5% next to it. The net income shows 1,250.00 in green color to represent a positive value.
3. The transactions are color coded based on the colors of the summary for Income and Expenses. 

Actual: the app behaves as expected. Each additional transaction updates the budget summary and recalculates and displays the updated percentages for all items on the list. There are no warnings or erros displayed in the console

_Scenario 2 - Missing Description_
1. Navigate to [Budget Planner](https://alexandrearantes1.github.io/budget-planner/)
2. Click on the "Value" text field and enter any numeric value. 
3. Click on the button to submit or press "Enter".

Expected:
1. The transaction is not added to the list. 
2. The alert box is displayed after the button for 5 seconds with the message "Description must have at least 3 characters". 
3. The focus is set to the Description text field.

Actual: the app behaves as expected with no warnings or erros displayed in the console. 

_Scenario 3 - Missing Value_
1. Navigate to [Budget Planner](https://alexandrearantes1.github.io/budget-planner/)
2. Enter a description with at least 3 characters.
3. Click the button to submit or press "Enter".

Expected: 
1. The transaction is not added to the list.
2. The alert box is displayed after the button for 5 seconds with the message "Value must have at least 1 digit."
3. The focus is set to the Value text field.

Actual: The app behaves as expected. There are no warnings or erros displayed in the console. 

_Scenario 4 - Value out of range_
1. Navigate to [Budget Planner](https://alexandrearantes1.github.io/budget-planner/)
2. Enter a description with 3 characters or more. 
3. Enter a value higher than 999,999.99. 
4. Click on the button to submit or press "Enter".
  
Expected:
1. The transaction is not added to the list. 
2. The alert box is displayed after the button for 5 seconds with the message "Value must be between 0.01 and 999,999.99".
3. The focus is set to the Value text field.
  
Actual: the app behaves as expected. There are no warnings or erros displayed in the console.

_Scenario 5 - Delete list item_
1. Navigate to [Budget Planner](https://alexandrearantes1.github.io/budget-planner/)
2. Add a few transactions following the steps outlined on Scenario 1.
3. Move the mouse over one of the transactions.
4. Value and percentage should move to the left revealing the delete button.
5. Click on the delete button.

Expected:
1. The transaction should be removed from the list. 
2. The budget summary is updated.
3. All percentages recalculated and updated on the screen.
4. If the transaction list is empty, the heading "Transactions" is hidden.
   
Actual: the app behaves as expected. There are no warnings or erros displayed in the console.

### Validator Testing

- HTML
  - No errors found when passing through the official [W3C Validator](https://validator.w3.org/).
  - One warning was issued for the "inputmode" attribute which is not supported by all browsers. This attribute was included to force mobile devices to display the numeric keypad when the Value text field is selected.
 ![W3C Validator](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/w3c-validator-index.png)

- CSS
  - No errors found when passing through the [Jigsaw Validator](https://jigsaw.w3.org/).
    - style.css:
    ![Jigsaw style.css](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/jigsaw-style.png)
    - toggle.css
    ![Jigsaw toggle.css](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/jigsaw-toggle.png)
    - tooltip.css
    ![Jigsaw tooltip.css](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/jigsaw-tooltip.png)
 
- Javascript
  - No warning or erros were found using the [JSHint Validator](https://jshint.com/) when you select the new ES6 features in the configurations. 
    - app-controller.js
    ![JSHint Validator](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/jshint-app-controller.png)
    - budget.js
    ![JSHint Validator](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/jshint-budget.png)
    - transaction.js
    ![JSHint Validator](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/jshint-transaction.png)
    - utils.js
    ![JSHint Validator](https://alexandrearantes1.github.io/budget-planner/assets/images/readme/jshint-utils.png)

### Bugs Fixed
- When clicking on the button to delete a transaction, there was a problem identifying which element was actually triggering the click event. This led to the app not finding the element which actually had the ID to be removed. 
  The solution was to check which type of element was being clicked (```<img>``` or ```<a>```) and depending on the result, seek the immediate parent element or the parent of the parent element to retrieve the ID.
  
- There was a serious issue when using the app in very small screens 320x480. The list became completely covered by footer and the layout was not apropriate for the size.
  The solution was to reduce the size of the footer icon and paddings, but it still was not enough so I decided to  
  "unstick" the form, freeing up more space at the expense of not having the form always available.  

### Unfixed Bugs
- If percentages have more than 4 digits before the decimal place, the space designated for the percentage box starts to blow up and can generate odd layout issues. It is unlikely to occur on a realistic scenario, but this issue will be addressed in a future release.

## Deployment

### Version Control

The web app was created using Virtual Studio Code IDE and pushed to the remote repository 'budget-planner'. 

The following git commands were used throughout the development of the app:

```git add <file>``` - This command was used to add the files to the staging area before they are committed.

```git commit -m "commit message"``` - This command was used to commit changes to the local repository. 

```git push``` - This command was used to push the commits to the remote repository on GitHub. 

```git pull``` - This command was used to update local files before pushing new commits, which was necessary because I was editing the README.md file directly on GitHub website. 

### Deployment to GitHub Pages
  - The site was deployed to GitHub Pages using the steps as follows:
    - In the GitHub repository, navigate to the Settings tab.
    - From the menu on left select 'Pages'.
    - From the source section drop-down menu, select the Branch: main.
    - Click 'Save'.
    - A live link will be displayed in a green banner when published successfully.
  - The live web app can be found here: [Budget Planner](https://alexandrearantes1.github.io/budget-planner/)

### Clone the Repository Code Locally
1. Navigate to the [Budget Planner Repository](https://github.com/alexandrearantes1/budget-planner).
2. Click on the code drop down button
3. Click on HTTPS
4. Copy the repository link to the clipboard
5. Open your IDE of choice (git must be installed for the next steps)
6. Type git clone copied-git-url into the IDE terminal
7. The project will now of been cloned on your local machine for use.


## Credits

- The Budget Planner was inspired by the Budgety Project from the Javascript course at [Coding Heroes](https://codingheroes.io) by Jonas Schmedtmann. 

- Header [Background Image](https://unsplash.com/photos/Vs6ip7fsld8) by Photo by [Aaron Lefler](https://unsplash.com/@alefler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  
- Input Numeric Keypad for Values Text Field:
  - Solution proposed by Aaron Gray [here - StackOverflow](https://stackoverflow.com/questions/6178556/phone-numeric-keyboard-for-text-input).
  
- Logo Design was done using [FreeLogoDesign](https://www.freelogodesign.org/).
  
- Tooltip CSS Only by [Reinhard Schnetzinger](https://codepen.io/reiinii1/pen/aPGXEa).

- Toggle Button (Income / Expense) based on [Gareth McKinley's toggle button](https://codepen.io/garetmckinley/pen/YmxYZr)

- Delete Button Icon from [IconScout](https://iconscout.com/icons/trash).
  
- ```formatNumber()``` function uses the regular expression solution proposed by [Scaramouche](https://stackoverflow.com/questions/49261076/applying-currency-format-using-replace-and-a-regular-expression)
to insert ',' every 3 digits and '.' before the decimal if needed.
