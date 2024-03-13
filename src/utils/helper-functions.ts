import { getMonth } from "date-fns";
import { ExpenseDataType } from "./shared-types";
import { colors } from "@mui/material";

export const createGuageData = (expenses: ExpenseDataType[], month: number, expenseLimit: number) => {
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

export const guageConfigMaker = (percent: number) => {
	return {
		width: 250,
		height: 250,
		type: 'meter',
		stepRatio: 1,
		steps: 100,
		gap: 100,
		percent: percent / 100,
    range: {
      color: [colors.green[800], colors.red[900]],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    axis: {
      // label: {
      //   formatter(v: number) {
      //     return Number(v) * 100;
      //   },
      // },
      subTickLine: {
        count: 3,
      },
    },
    statistic: {
      content: {
        // formatter: ({ percent }: {percent: number }) => `Monthly Limit: ${(percent * 100).toFixed(0)}%`,
        style: {
          color: 'rgba(0,0,0,0.65)',
          fontSize: '25px',
        },
      },
    },
  };
};