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
    // Работа с датой
    time = prompt('Введите дату в формате YYYY-MM-DD:', 'YYYY-MM-DD');
    let yearInput = new Date(Date.parse(time)).getFullYear(); // Превращаем введённую дату в количество милисекунд, а затем из этого количества милисекунд 
    let monthInput = new Date(Date.parse(time)).getMonth() + 1; // формируем новую дату и получаем из неё значение года, месяца и дня
    let dayInput = new Date(Date.parse(time)).getDate();
    while(isNaN(yearInput) || isNaN(monthInput) || isNaN(dayInput)) {
        time = prompt('Дата введена неверно! Введите дату в формате YYYY-MM-DD:', 'YYYY-MM-DD');
        yearInput = new Date(Date.parse(time)).getFullYear(); // Превращаем введённую дату в количество милисекунд, а затем из этого количества милисекунд 
        monthInput = new Date(Date.parse(time)).getMonth() + 1; // формируем новую дату и получаем из неё значение года, месяца и дня
        dayInput = new Date(Date.parse(time)).getDate();
    }
    year.value = yearInput;
    month.value = monthInput;
    day.value = dayInput;
    appData.timeData = time;
    
    // Работа с бюджетом
    money = +prompt('Ваш бюджет на месяц:');
    if(isNaN(money) || money == "" || money == null) {
        money = +prompt('Вы ввели некорректные данные! Введите ваш бюджет на месяц:');
    }
    appData.budget = money;
    budgetOutput.textContent = money.toFixed();
    
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
    btnExpensesItems.style.color = '#ffffff';
    btnOptionalExpensesItems.style.backgroundImage = 'linear-gradient(336deg, #ffbd75, #ff964b), linear-gradient(#ffffff, #ffffff)';
    btnOptionalExpensesItems.style.color = '#ffffff';
    btnCountBudget.style.backgroundImage = 'linear-gradient(336deg, #ffbd75, #ff964b), linear-gradient(#ffffff, #ffffff)';
    btnCountBudget.style.color = '#ffffff';
    btnCalculation.style.backgroundImage = 'linear-gradient(90deg, rgba(62,218,125,1) 0%, rgba(20,148,52,1) 100%)';
    btnCalculation.style.color = '#ffffff';
});

// Обязательные расходы
btnExpensesItems.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < expensesItems.length; i++) {
        if(typeof(expensesItems[i].value) === "string" && typeof(expensesItems[i].value) != null && expensesItems[i].value != "") {
            expenseItem = expensesItems[i].value;
            document.querySelector('.error-expenses').textContent = '';

            expenseItemValue = +expensesItems[++i].value;
            //console.log(expensesItems[++i]);
            if(isNaN(expenseItemValue) == false && typeof(expenseItemValue) != null && expenseItemValue != "") {
                
                appData.expenses[expenseItem] = expenseItemValue;
                sum += expenseItemValue;
            } else {
                document.querySelector('.error-expenses').textContent = 'Вы допустили ошибку при вводе цены! Цена должна состоять только из цифр!';
            }
        } else {
            document.querySelector('.error-expenses').textContent = 'Вы допустили ошибку при вводе наименования расхода!';
        }
    }
    expensesOutput.textContent = sum;
});

 // Необязательные расходы
btnOptionalExpensesItems.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItems.length; i++) {
        appData.optionalExpenses[i] = optionalExpensesItems[i].value;
        optionalExpensesOutput.textContent += appData.optionalExpenses[i] + ' '; 
    };
});

// Расчёт бюджета на 1 день + вывод уровня дохода 
btnCountBudget.addEventListener('click', function() {

    if(appData.budget != undefined) {
        appData["moneyPerDay"] = +((appData["budget"] - expensesOutput.textContent) / 30).toFixed(1);
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
        if(typeof(items) === "string") {
            appData.income = items.split(",");
            incomeOutput.textContent = appData.income;
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
        let sum = +sumSavings.value,
            percent = +percentSavings.value;
        
        if (isNaN(sum) == false && isNaN(percent) == false) {
            document.querySelector('.error-savings').textContent = '';
            appData.monthIncome = sum * percent / 100 / 12;
            appData.yearIncome = sum * percent / 100;

            monthSavingsOutput.textContent = appData.monthIncome.toFixed(1);  // Приводим результат к значению с плавающей точкой. 1 символ после запятой
            yearSavingsOutput.textContent = appData.yearIncome.toFixed(1);
        } else {
            document.querySelector('.error-savings').textContent = 'Вы ввели неверные данные! Поля "Сумма" и "Процент" могут содержать только цифры!';
        }
        
    }
});

// Для поля с вводом процента
percentSavings.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +sumSavings.value,
            percent = +percentSavings.value;
        
        if (isNaN(sum) == false && isNaN(percent) == false) {
            document.querySelector('.error-savings').textContent = '';
            appData.monthIncome = sum * percent / 100 / 12;
            appData.yearIncome = sum * percent / 100;

            monthSavingsOutput.textContent = appData.monthIncome.toFixed(1);  // Приводим результат к значению с плавающей точкой. 1 символ после запятой
            yearSavingsOutput.textContent = appData.yearIncome.toFixed(1);
        } else {
            document.querySelector('.error-savings').textContent = 'Вы ввели неверные данные! Поля "Сумма" и "Процент" могут содержать только цифры!';
        }
        
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



