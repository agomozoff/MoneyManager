let money, 
    time,
    expenseItem,
    expenseItemValue;

function start() {
    money = +prompt('Ваш бюджет на месяц:');
    time = prompt('Введите дату в формате YYYY-MM-DD:', 'YYYY-MM-DD');

    if(isNaN(money) || money == "" || money == null) {
        money = +prompt('Вы ввели некорректные данные! Введите ваш бюджет на месяц:');
    }
}
start();


let appData = {
    budget: money,
    timeData: time,
    expenses: {

    },
    optionalExpenses: {
        
    },
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (i = 0; i < 2; i++) {    
            expenseItem = prompt('Введите обязательную статью расходов в этом месяце:');
            if (typeof(expenseItem) === "string" && typeof(expenseItem) != null && expenseItem != "") {
        
                expenseItemValue = +prompt('Во сколько рублей обойдётся?');
                if (isNaN(expenseItemValue) != true && typeof(expenseItemValue) != null && expenseItemValue != "") {
        
                    appData.expenses[expenseItem] = expenseItemValue;
                } else {
                    let isCorrect = false;
        
                    while (isCorrect == false) {
                        expenseItemValue = +prompt('Вы допустили ошибку при вводе! Укажите во сколько рублей обойдётся покупка?');
                        if (isNaN(expenseItemValue) != true && typeof(expenseItemValue) != null && expenseItemValue != "") {
                            isCorrect = true;
                        }
                    }
                    appData.expenses[expenseItem] = expenseItemValue;
                }
            } else {
                let isCorrect = false;
        
                while (isCorrect == false) {
                    expenseItem = prompt('Вы допустили ошибку при вводе! Введите обязательную статью расходов в этом месяце заново:');
                    if (typeof(expenseItem) === "string" && typeof(expenseItem) != null && expenseItem != "") {
                        isCorrect = true;
                    };
                };
        
                expenseItemValue = +prompt('Во сколько рублей обойдётся?');
        
                if (isNaN(expenseItemValue) != true && typeof(expenseItemValue) != null && expenseItemValue != "") {
        
                    appData.expenses[expenseItem] = expenseItemValue;
                } else {
                    let isCorrect = false;
        
                    while (isCorrect == false) {
                        expenseItemValue = +prompt('Вы допустили ошибку при вводе! Укажите во сколько рублей обойдётся покупка?');
                        if (isNaN(expenseItemValue) != true && typeof(expenseItemValue) != null && expenseItemValue != "") {
                            isCorrect = true;
                        }
                    }
                    appData.expenses[expenseItem] = expenseItemValue;
                };
            };
        };
    },

    detectDayBudget: function() {
        appData["moneyPerDay"] = +(appData["budget"] / 30).toFixed(1);
        alert(`Ваш бюджет на 1 день составит: ${appData.moneyPerDay} руб.`);
    },

    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log("Очень маленький достаток");
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
            console.log("Средний достаток");
        } else if (appData.moneyPerDay >= 2000) {
            console.log("Очень хороший достаток")
        };
    },

    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Сумма ваших накоплений равна: "),
                percent = +prompt("Под какой процент?");
    
            appData.monthIncome = save * percent / 100 / 12;
            alert(`Доход с вашего депозита составляет ${appData.monthIncome} руб./месяц`);
        };
    },

    chooseOptExpenses: function() {
        for (i = 1; i <= 3; i++) {
            appData.optionalExpenses[i] = prompt("Статья необязательных расходов: ");
        };
    },

    chooseIncome: function() {
        let items = prompt("Что принесёт вам дополнительный доход? (Перечислите через запятую)");
        if(typeof(items) === "string" && typeof(items) != null && items != "") {
            appData.income = items.split(", ");
        } else {
            isCorrect = true;
            while(isCorrect) {
                items = prompt("Вы неверно ввели данные! Введите через запятую информацию о дополнительном доходе");
                if(typeof(items) === "string" && typeof(items) != null && items != "") {
                    appData.income = items.split(", ");
                    isCorrect = false;
                }
            }
        }
        
        appData.income.push(prompt("Может что-то ещё?"));
        appData.income.sort();

        appData.income.forEach(function(item, i) {
            alert(`Способы дополнительного заработка: ${i + 1} - ${item}`);
        });
    },

    appDataOutput: function() {
        appDataKeys = "";
        for (key in appData) {
            appDataKeys += key + ", "; 
        }
        console.log(`Наша программа включает в себя данные: ${appDataKeys.slice(0, -2)}`);
    }
};

let btnCalculation = document.getElementById('start');
// btnCalculation.addEventListener('click', function(){
//     alert('рассчитать');
// });

let budgetOutput = document.querySelector('.budget-value');
let dayBudgetOutput = document.querySelector('.daybudget-value');
let levelOutput = document.querySelector('.level-value');
let expensesOutput = document.querySelector('.expenses-value');
let optionalExpensesOutput = document.querySelector('.optionalexpenses-value');
let incomeOutput = document.querySelector('.income-value');
let monthSavingsOutput = document.querySelector('.monthsavings-value');
let yearSavingsOutput = document.querySelector('.yearsavings-value');

let expensesItems = document.getElementsByClassName("expenses-item");
let btnExpensesItems = document.getElementsByTagName('button')[0];

let optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item');
let btnOptionalExpensesItems = document.getElementsByTagName('button')[1];

let btnCountBudget = document.getElementsByTagName('button')[2];

let chooseIncome = document.querySelector('.choose-income');
let checkboxSavings = document.querySelector('#savings');
let sumSavings = document.querySelector('#sum');
let percentSavings = document.querySelector('#percent');

let year = document.querySelector('.year-value');
let month = document.querySelector('.month-value');
let day = document.querySelector('.day-value');

