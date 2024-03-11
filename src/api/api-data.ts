import { ExpensesResponseType, TokenResponseType, UserType } from "src/utils/shared-types";
import { expenseData } from "src/api//expense-data";

const getUserResponse: UserType = {
	id: '001',
	name: 'John',
	email: 'abc@xyz.com',
	avatar: 'https://img.freepik.com/free-photo/smiling-man_1098-15443.jpg'
};
const getUserTokenResponse: TokenResponseType = {userToken: 'abcdef123456'};

const getExpenses: ExpensesResponseType = {expenses: expenseData};

export const data = {
	'user': getUserResponse,
	'user-token': getUserTokenResponse,
	'expenses': getExpenses
};
