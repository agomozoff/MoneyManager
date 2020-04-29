"use strict";

// Получаем все нужные элементы на странице
let expensesItems = document.getElementsByClassName("expenses-item");
let btnExpensesItems = document.getElementsByTagName('button')[0];
let optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item');
let btnOptionalExpensesItems = document.getElementsByTagName('button')[1];
let btnCountBudget = document.getElementsByTagName('button')[2];
let incomeItem = document.querySelector('.choose-income');
let checkboxSavings = document.querySelector('#savings');
let sumSavings = document.querySelector('#sum');
let percentSavings = document.querySelector('#percent');
let btnCalculation = document.getElementById('start');

let budgetOutput = document.querySelector('.budget-value');
let dayBudgetOutput = document.querySelector('.daybudget-value');
let levelOutput = document.querySelector('.level-value');
let expensesOutput = document.querySelector('.expenses-value');
let optionalExpensesOutput = document.querySelector('.optionalexpenses-value');
let incomeOutput = document.querySelector('.income-value');
let monthSavingsOutput = document.querySelector('.monthsavings-value');
let yearSavingsOutput = document.querySelector('.yearsavings-value');
let year = document.querySelector('.year-value');
let month = document.querySelector('.month-value');
let day = document.querySelector('.day-value');

// Необходимые переменные
let money, 
    time,
    expenseItem,
    expenseItemValue;

// Кнопка "Начать расчёт". Запрашиваем данные у пользователя
btnCalculation.addEventListener('click', function(){
    time = prompt('Введите дату в формате YYYY-MM-DD:', 'YYYY-MM-DD');
    money = +prompt('Ваш бюджет на месяц:');

    if(isNaN(money) || money == "" || money == null) {
        money = +prompt('Вы ввели некорректные данные! Введите ваш бюджет на месяц:');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetOutput.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear(); // Превращаем введённую дату в количество милисекунд, а затем из этого количества милисекунд 
    month.value = new Date(Date.parse(time)).getMonth() + 1; // формируем новую дату и получаем из неё значение года, месяца и дня
    day.value = new Date(Date.parse(time)).getDate();

    // Включаем неактивные поля и кнопки
    for(let item of expensesItems) {
        item.removeAttribute('disabled', 'disabled');
    }    
    btnExpensesItems.removeAttribute('disabled', 'disabled');
    for (let item of optionalExpensesItems){
        item.removeAttribute('disabled', 'disabled');
    }    
    btnOptionalExpensesItems.removeAttribute('disabled', 'disabled');
    btnCountBudget.removeAttribute('disabled', 'disabled');
    incomeItem.removeAttribute('disabled', 'disabled');
    checkboxSavings.removeAttribute('disabled', 'disabled');
    btnCalculation.removeAttribute('disabled', 'disabled');

    // Меняем фон активных кнопок
    btnExpensesItems.style.backgroundImage = 'linear-gradient(336deg, #ffbd75, #ff964b), linear-gradient(#ffffff, #ffffff)';
    btnOptionalExpensesItems.style.backgroundImage = 'linear-gradient(336deg, #ffbd75, #ff964b), linear-gradient(#ffffff, #ffffff)';
    btnCountBudget.style.backgroundImage = 'linear-gradient(336deg, #ffbd75, #ff964b), linear-gradient(#ffffff, #ffffff)';
    btnCalculation.style.backgroundImage = 'linear-gradient(90deg, rgba(241,95,122,1) 0%, rgba(233,148,160,1) 100%)';
});

// Обязательные расходы
btnExpensesItems.addEventListener('click', function(){
    let sum = 0;

    for (i = 0; i < expensesItems.length; i++) {    // не привязываемся к количеству инпутов на странице
        expenseItem = expensesItems[i].value;
        if (typeof(expenseItem) === "string" && typeof(expenseItem) != null && expenseItem != "") {
    
            expenseItemValue = +expensesItems[++i].value; // ++i возвращает значение на 1 больше. В данном случае он вернёт сначала 1, затем 3
            if (isNaN(expenseItemValue) != true && typeof(expenseItemValue) != null && expenseItemValue != "") {
    
                appData.expenses[expenseItem] = expenseItemValue;
                sum += expenseItemValue;
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
    expensesOutput.textContent = sum;
});

 // Необязательные расходы
btnOptionalExpensesItems.addEventListener('click', function() {
    for (i = 0; i < optionalExpensesItems.length; i++) {
        appData.optionalExpenses[i] = optionalExpensesItems[i].value;
        optionalExpensesOutput.textContent += appData.optionalExpenses[i] + ' '; 
    };
});

// Расчёт бюджета на 1 день + вывод уровня дохода 
btnCountBudget.addEventListener('click', function() {

    if(appData.budget != undefined) {
        appData["moneyPerDay"] = +(appData["budget"] / 30).toFixed(1);
        dayBudgetOutput.textContent = appData["moneyPerDay"];

        if (appData.moneyPerDay < 100) {
            levelOutput.textContent = "Очень маленький достаток";
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
            levelOutput.textContent = "Средний достаток";
        } else if (appData.moneyPerDay >= 2000) {
            levelOutput.textContent = "Очень хороший достаток";
        };
    } else {
        dayBudgetOutput.textContent = "Произошла ошибка! Вы не ввели данные!";
        levelOutput.textContent = "Произошла ошибка! Вы не ввели данные!";
    };
});

// Дополнительный доход
incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
        if(typeof(items) === "string" && typeof(items) != null && items != "") {
            appData.income = items.split(", ");
            incomeOutput.textContent = appData.income;
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
});

// Активируем пункт с накоплениями через checkbox
checkboxSavings.addEventListener('click', function() {
    if(appData.savings == true) {
        appData.savings = false;
        sumSavings.setAttribute('disabled', 'disabled');
        percentSavings.setAttribute('disabled', 'disabled');
        sumSavings.style.backgroundColor = '#faf8f5';
        percentSavings.style.backgroundColor = '#faf8f5';
    } else {
        appData.savings = true;
        sumSavings.removeAttribute('disabled', 'disabled');
        percentSavings.removeAttribute('disabled', 'disabled');
        sumSavings.style.backgroundColor = '#ffffff';
        percentSavings.style.backgroundColor = '#ffffff';
    }
});

// Работаем с накоплениями, подсчитываем сколько накопится за месяц и за год
// Для поля с вводом суммы
sumSavings.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +sumSavings.value;
            percent = +percentSavings.value;
        
        appData.monthIncome = sum * percent / 100 / 12;
        appData.yearIncome = sum * percent / 100;

        monthSavingsOutput.textContent = appData.monthIncome.toFixed(1);  // Приводим результат к значению с плавающей точкой. 1 символ после запятой
        yearSavingsOutput.textContent = appData.yearIncome.toFixed(1);
    }
});

// Для поля с вводом процента
percentSavings.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +sumSavings.value;
            percent = +percentSavings.value;
        
        appData.monthIncome = sum * percent / 100 / 12;
        appData.yearIncome = sum * percent / 100;

        monthSavingsOutput.textContent = appData.monthIncome.toFixed(1);
        yearSavingsOutput.textContent = appData.yearIncome.toFixed(1);
    }
});

// Создаём объект со всеми необходимыми данными
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false  
    
    // chooseIncome: function() {
        
        
    //     appData.income.push(prompt("Может что-то ещё?"));
    //     appData.income.sort();

    //     appData.income.forEach(function(item, i) {
    //         alert(`Способы дополнительного заработка: ${i + 1} - ${item}`);
    //     });
    // },

    // appDataOutput: function() {
    //     appDataKeys = "";
    //     for (key in appData) {
    //         appDataKeys += key + ", "; 
    //     }
    //     console.log(`Наша программа включает в себя данные: ${appDataKeys.slice(0, -2)}`);
    // }
};



