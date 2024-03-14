import { getYear, getWeek, getMonth, format } from "date-fns";
import { ExpenseDataType, PieDataType, TimePeriod } from "./shared-types";
import { green, red } from "@mui/material/colors";

export const createColData = (expenses: ExpenseDataType[], timePeriod: TimePeriod, currentMonth: number) => {
	const colData: {name: string, month: string, amount: number}[] = [];
	const currentYear = getYear(new Date());
	const currentWeek = getWeek(new Date());
	let localExpenses = expenses;
	if (timePeriod === TimePeriod.year) {
		localExpenses = localExpenses.filter(expense => getYear(new Date(expense.date)) === currentYear);
	} else if ((timePeriod === TimePeriod.month)) {
		localExpenses = localExpenses.filter(expense => getWeek(new Date(expense.date)) === currentWeek);
	}
	localExpenses.forEach((expense) => {
		const month = format(new Date(expense.date), timePeriod === TimePeriod.year ? 'MMM' : 'wo');
		const name = expense.type === 'credit' ? 'Credit' : 'Debit';
		colData.push({
			name,
			month,
			amount: parseFloat(expense.amount.toString()),
		});
	});
	colData.sort((a, b) => a.name.localeCompare(b.name));
	return colData;
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