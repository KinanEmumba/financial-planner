import { getMonth, format } from "date-fns";
import { ExpenseDataType, PieDataType } from "./shared-types";
import { green, red } from "@mui/material/colors";

export const createColData = (expenses: ExpenseDataType[]) => {
	const colData: {name: string, month: string, amount: number}[] = [];
	expenses.forEach((expense) => {
		const month = format(new Date(expense.date), "MMM");
		const name = expense.type === 'credit' ? 'Credit' : 'Debit';
		colData.push({
			name,
			month,
			amount: parseFloat(expense.amount.toString()),
		});
	});
	colData.sort((a, b) => a.name.localeCompare(b.name));
	return colData;
	// return [
	// 	{
	// 		"name": "London",
	// 		"month": "Jan.",
	// 		"amount": 18.9
	// 	},
	// 	{
	// 		"name": "London",
	// 		"month": "Feb.",
	// 		"amount": 28.8
	// 	},
	// 	{
	// 		"name": "London",
	// 		"month": "Mar.",
	// 		"amount": 39.3
	// 	},
	// 	{
	// 		"name": "London",
	// 		"month": "Apr.",
	// 		"amount": 81.4
	// 	},
	// 	{
	// 		"name": "London",
	// 		"month": "May",
	// 		"amount": 47
	// 	},
	// 	{
	// 		"name": "London",
	// 		"month": "Jun.",
	// 		"amount": 20.3
	// 	},
	// 	{
	// 		"name": "London",
	// 		"month": "Jul.",
	// 		"amount": 24
	// 	},
	// 	{
	// 		"name": "London",
	// 		"month": "Aug.",
	// 		"amount": 35.6
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "Jan.",
	// 		"amount": 12.4
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "Feb.",
	// 		"amount": 23.2
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "Mar.",
	// 		"amount": 34.5
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "Apr.",
	// 		"amount": 99.7
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "May",
	// 		"amount": 52.6
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "Jun.",
	// 		"amount": 35.5
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "Jul.",
	// 		"amount": 37.4
	// 	},
	// 	{
	// 		"name": "Berlin",
	// 		"month": "Aug.",
	// 		"amount": 42.4
	// 	}
  // ];
};

export const createPieData = (expenses: ExpenseDataType[], month: number) => {
	const monthExpenses = getMonthExpenses(expenses, month);
	const pieData: PieDataType[] = monthExpenses.reduce((acc: PieDataType[], expense: ExpenseDataType) => {
		const index = acc.findIndex(item => item.type === expense.category);
		if (index !== -1) {
			acc[index].value += 1;
		} else {
			acc.push({ type: expense.category, value: 1 });
		}
		return acc;
	}, []).map((item: PieDataType) => ({
		...item,
		value: (item.value / expenses.length) * 100
	}));
	return pieData;
};

export const createDashboardData = (expenses: ExpenseDataType[], month: number, expenseLimit: number) => {
	const monthExpenses = getMonthExpenses(expenses, month);
	console.log('current month expenses', monthExpenses);
	const totalExpense = sumOfDebitEntries(monthExpenses);
	const totalIncome = sumOfCreditEntries(monthExpenses);
	const guagePercent = percentMaker(totalExpense, expenseLimit);
	const balance = totalIncome - totalExpense;
	return {guagePercent, totalExpense, totalIncome, balance};
};

export const getMonthExpenses = (expenses: ExpenseDataType[], month?: number) => {
	return expenses.filter(exp => getMonth(exp.date) === month);
};

export const sumOfDebitEntries = (expenses: ExpenseDataType[]) => {
	return sumEntriesByType(expenses, 'debit');
};

export const sumOfCreditEntries = (expenses: ExpenseDataType[]) => {
	return sumEntriesByType(expenses, 'credit');
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
		width: 420,
    height: 420,
    autoFit: true,
    data: {
      target: current,
      total: total,
      name: 'expense',
    },
		scale: {
      color: {
        range: [`l(0) 0:${green[500]} 1:${red[900]}`],
      },
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
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
};

export const colConfigMaker = (data: {name: string, month: string, amount: number}[], appColor: string) => {
	return {
    data,
    xField: 'month',
    yField: 'amount',
    colorField: 'name',
    group: true,
    barStyle: { fill: appColor },
		width: 500,
		// color: ['#6EB8AF', '#D2691E'],
  };
};