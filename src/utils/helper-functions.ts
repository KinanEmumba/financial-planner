import { getMonth } from "date-fns";
import { ExpenseDataType, PieDataType } from "./shared-types";
import { colors } from "@mui/material";

export const createBarData = (expenses: ExpenseDataType[]) => {
	return [
		{ category: 'A', value: 10 },
		{ category: 'B', value: 20 },
		{ category: 'C', value: 15 },
		{ category: 'D', value: 25 },
	];
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

export const pieConfigMaker = (data :  {type: string, value: number}[]) => {
	return {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    startAngle: Math.PI,
    endAngle: Math.PI * 3,
    label: {
      type: 'inner',
      offset: '-8%',
      content: '{name}',
      style: {
        fontSize: 18,
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    pieStyle: {
      lineWidth: 0,
    },
  };
};

export const barConfigMaker = (data: {category: string, value: number}[], appColor: string) => {
	return {
    data,
    xField: 'type',
    yField: 'month',
    barStyle: { fill: appColor },
  };
};