let money, 
    time,
    expenseItem,
    expenseItemValue;


money = +prompt('Ваш бюджет на месяц:');
time = prompt('Введите дату в формате YYYY-MM-DD:', 'YYYY-MM-DD');

let appData = {
    budget: money,
    timeData: time,
    expenses: {

    },
    optionalExpenses: {
        
    },
    income: [],
    savings: false
};

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
            }
        }

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

    }
    
};

appData["moneyPerDay"] = appData["budget"] / 30;

alert(`Ваш бюджет на 1 день составит: ${appData.moneyPerDay} руб.`);

if (appData.moneyPerDay < 100) {
    console.log("Очень маленький достаток");
} else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
    console.log("Средний достаток");
} else if (appData.moneyPerDay >= 2000) {
    console.log("Очень хороший достаток")
}

