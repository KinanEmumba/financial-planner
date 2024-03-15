import { getYear, getMonth, format } from "date-fns"
import { green, red, yellow } from "@mui/material/colors"

import {
	CategoryDataType,
	ExpenseDataType,
	ExpenseType,
	PieDataType,
	TimePeriod
} from "src/utils/shared-types"

export const createColData = (expenses: ExpenseDataType[], timePeriod: TimePeriod) => {
	const colData: {name: string, month: string, amount: number}[] = [];
	let localExpenses = expenses;
	if (timePeriod === TimePeriod.year) {
		localExpenses = getYearExpenses(expenses);
	} else if ((timePeriod === TimePeriod.month)) {
		localExpenses = getMonthExpenses(expenses);
	}
	localExpenses.forEach((expense) => {
		const month = format(new Date(expense.date), timePeriod === TimePeriod.year ? 'MMM' : 'wo');
		const name = expense.type === ExpenseType.credit ? 'Credit' : 'Debit';
		colData.push({
			name,
			month,
			amount: parseFloat(expense.amount.toString()),
		});
	});
	colData.sort((a, b) => a.name.localeCompare(b.name));
	return colData;
};

export const createPieData = (expenses: ExpenseDataType[], timePeriod: TimePeriod) => {
	let localExpenses = expenses;
	if (timePeriod === TimePeriod.year) {
		localExpenses = getYearExpenses(expenses);
	} else if ((timePeriod === TimePeriod.month)) {
		localExpenses = getMonthExpenses(expenses);
	}
	const pieData: PieDataType[] = localExpenses.reduce((acc: PieDataType[], expense: ExpenseDataType) => {
		const index = acc.findIndex(item => item.type === expense.category);
		if (index !== -1) {
			acc[index].value += 1;
		} else {
			acc.push({ type: expense.category, value: 1 });
		}
		return acc;
	}, []).map((item: PieDataType) => ({
		...item,
		value: parseFloat(((item.value / expenses.length) * 100).toFixed(1))
	}));
	return pieData;
};

export const createDashboardData = (expenses: ExpenseDataType[], month: number, expenseLimit: number) => {
	const monthExpenses = getMonthExpenses(expenses, month);
	const totalExpense = sumOfDebitEntries(monthExpenses);
	const totalIncome = sumOfCreditEntries(monthExpenses);
	const guagePercent = percentMaker(totalExpense, expenseLimit);
	const balance = totalIncome - totalExpense;
	return {guagePercent, totalExpense, totalIncome, balance};
};

export const getMonthExpenses = (expenses: ExpenseDataType[], month?: number) => {
	return expenses.filter(exp => getMonth(exp.date) === (month || getMonth(new Date())));
};

export const getYearExpenses = (expenses: ExpenseDataType[], year?: number) => {
	return expenses.filter(exp => getYear(exp.date) === (year || getYear(new Date())));
};

export const sumOfDebitEntries = (expenses: ExpenseDataType[]) => {
	return sumEntriesByType(expenses, ExpenseType.debit);
};

export const sumOfCreditEntries = (expenses: ExpenseDataType[]) => {
	return sumEntriesByType(expenses, ExpenseType.credit);
};

export const sumEntriesByType = (expenses: ExpenseDataType[], type: string) => {
	return expenses.reduce((acc: number, current: ExpenseDataType): number => {
		const currentAmount = parseFloat(current.amount as string);
		acc = acc + (current.type === type ? currentAmount : 0);
		return acc;
	}, 0);
};

export const percentMaker = (totalExpense: number, limit: number) => {
	return totalExpense * 100 / limit;
};

export const guageConfigMaker = (total: number, current: number) => {
	return {
		insetBottom: -100,
    autoFit: true,
    data: {
      target: current >= total ? total : current,
      total: total,
      name: 'expense',
    },
		scale: {
      color: {
				range: [
					`l(0) 0:${green[500]} 0.25:${yellow[500]} 1:${red[900]}`,
					`${red[900]}`
				],
      },
    },
		style: {
      textContent: () => ``,
    },
    legend: false,
  };
};

export const pieConfigMaker = (data :  {type: string, value: number}[]) => {
	return {
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: (value: {value: number}) => value.value,
      style: {
        fontWeight: 'bold',
      },
    },
		tooltip: (value: {type: string, value: number}) => ({name: value.type, value: value.value}),
    legend: {
			color: {
        title: false,
      },
    },
  };
};

export const colConfigMaker = (data: {name: string, month: string, amount: number}[], appColor: string) => {
	return {
    data,
		autoFit: true,
    xField: 'month',
    yField: 'amount',
    colorField: 'name',
    group: true,
    barStyle: { fill: appColor },
		width: 500,
		// color: ['#6EB8AF', '#D2691E'],
  };
};

export const addNewCategoryFromExpense = (expenseCategory: string) => {
	const storedCats = localStorage.getItem('categories');
	if (!storedCats) return;
	const catArray = JSON.parse(storedCats);
	const cats: string[] = catArray.map((cat: CategoryDataType) => cat.title);
	const exists = cats.find((cat: string) => cat === expenseCategory);
	if (exists) return;
	else catArray.unshift({title: expenseCategory, limit: 0});
	localStorage.setItem('categories', JSON.stringify(catArray));
};
