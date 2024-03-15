import {
	CategoryDataType,
	CreateExpenseResponseType,
	DeleteExpenseResponseType,
	EditExpenseResponseType,
	ExpenseDataType,
	ExpenseType,
	ExpensesResponseType,
	TokenResponseType,
	UserType
} from "src/utils/shared-types"
import { expenseData, categoriesData } from "src/api/expense-data"
import { addNewCategoryFromExpense } from "src/utils/helper-functions"

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
	if (!storedExpenses) {
		localStorage.setItem('expenses', JSON.stringify(expenseData));
		localExpensesData = {expenses: expenseData};
	} else {
		localExpensesData = {expenses: JSON.parse(storedExpenses)};
	}
	return localExpensesData;
};

const postExpense = (body: {expense: ExpenseDataType}): CreateExpenseResponseType => {
	if (body.expense.type === ExpenseType.debit) {
		addNewCategoryFromExpense(body.expense.category);
	}
	const storedExpenses = localStorage.getItem('expenses');
	const localExpensesData: ExpenseDataType[] = storedExpenses && JSON.parse(storedExpenses);
	localStorage.setItem('expenses', JSON.stringify([body?.expense, ...localExpensesData]));
	return {message: 'Expense added successfully'}
};

const deleteExpense = (body: {expense: ExpenseDataType, id: number}): DeleteExpenseResponseType => {
	const storedExpenses = localStorage.getItem('expenses');
	const localExpensesData: ExpenseDataType[] = storedExpenses && JSON.parse(storedExpenses);
	const newArray = [...localExpensesData.slice(0, body.id), ...localExpensesData.slice(body.id + 1)];
	localStorage.setItem('expenses', JSON.stringify([...newArray]));
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
	return {message: 'Expense edited successfully'}
};

const getLimit = () => {
	const expenseLimit = localStorage.getItem('limit');
	return {limit: expenseLimit || null}
};

const limitChange = (body: {limit: string | number}) => {
	localStorage.setItem('limit', body.limit as string);
	return {message: 'Monthly limit changed successfully'}
};

const getCategories = () => {
	let localCats;
	const storedCats = localStorage.getItem('categories');
	if (!storedCats) {
		localStorage.setItem('categories', JSON.stringify(categoriesData));
		localCats = {categories: categoriesData};
	} else {
		localCats = {categories: JSON.parse(storedCats)};
	}
	return localCats;
};

const setCategories = (body: {categories: CategoryDataType[]}) => {
	localStorage.setItem('categories', JSON.stringify(body?.categories));
	return {message: 'Categories updated'}
};

export const data = {
	'user': getUserResponse,
	'user-token': getUserTokenResponse,
	'expenses': getExpenses,
	'expense/post': postExpense,
	'expense/delete': deleteExpense,
	'expense/edit': editExpense,
	'limit': getLimit,
	'limitChange': limitChange,
	'categories': getCategories,
	'categoriesChange': setCategories,
};
