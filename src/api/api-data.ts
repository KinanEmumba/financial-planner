import {
	CreateExpenseResponseType,
	DeleteExpenseResponseType,
	EditExpenseResponseType,
	ExpenseDataType,
	ExpensesResponseType,
	TokenResponseType,
	UserType
} from "src/utils/shared-types";
import { expenseData } from "src/api//expense-data";

const getUserResponse = (): UserType => ({
	id: '001',
	name: 'John',
	email: 'abc@xyz.com',
	avatar: 'https://img.freepik.com/free-photo/smiling-man_1098-15443.jpg'
});

const getUserTokenResponse = (): TokenResponseType => ({userToken: 'abcdef123456'});

const getExpenses = (): ExpensesResponseType => {
	let localExpensesData;
	const storedExpenses = localStorage.getItem('expenses');
	if (!storedExpenses?.length) {
		localStorage.setItem('expenses', JSON.stringify(expenseData));
		localExpensesData = {expenses: expenseData};
	} else {
		localExpensesData = {expenses: JSON.parse(storedExpenses)};
	}
	return localExpensesData;
};

const postExpense = (body: {expense: ExpenseDataType}): CreateExpenseResponseType => {
	const storedExpenses = localStorage.getItem('expenses');
	const localExpensesData: ExpenseDataType[] = storedExpenses && JSON.parse(storedExpenses);
	localStorage.setItem('expenses', JSON.stringify([body?.expense, ...localExpensesData]));
	window.dispatchEvent(new CustomEvent('storage', {detail: 'expense added'} as {detail:  string}));
	return {message: 'Expense added successfully'}
};

const deleteExpense = (body: {expense: ExpenseDataType, id: number}): DeleteExpenseResponseType => {
	const storedExpenses = localStorage.getItem('expenses');
	const localExpensesData: ExpenseDataType[] = storedExpenses && JSON.parse(storedExpenses);
	const newArray = [...localExpensesData.slice(0, body.id), ...localExpensesData.slice(body.id + 1)];
	localStorage.setItem('expenses', JSON.stringify([...newArray]));
	window.dispatchEvent(new CustomEvent('storage', {detail: 'expense deleted'} as {detail:  string}));
	return {message: 'Expense deleted successfully'}
};

const editExpense = (body: {expense: ExpenseDataType, id: number}): EditExpenseResponseType => {
	const storedExpenses = localStorage.getItem('expenses');
	const localExpensesData: ExpenseDataType[] = storedExpenses && JSON.parse(storedExpenses);
	const newArray = localExpensesData.map((exp, index) => {
		if (index === body.id) {
			return body.expense;
		} else {
			return exp;
		}
	});
	localStorage.setItem('expenses', JSON.stringify([...newArray]));
	window.dispatchEvent(new CustomEvent('storage', {detail: 'expense edited'} as {detail:  string}));
	return {message: 'Expense edited successfully'}
};

const limitChange = (body: {limit: string | number}) => {
	localStorage.setItem('limit', body.limit as string);
	window.dispatchEvent(new CustomEvent('storage', {detail: 'limit changed'} as {detail:  string}));
	return {message: 'Monthly limit changed successfully'}
};

export const data = {
	'user': getUserResponse,
	'user-token': getUserTokenResponse,
	'expenses': getExpenses,
	'expense/post': postExpense,
	'expense/delete': deleteExpense,
	'expense/edit': editExpense,
	'limitChange': limitChange
};
