import { Dispatch, ReactNode, SetStateAction } from "react";
import { AlertColor } from "@mui/material";

import { data } from "src/api/mock-database";

export type API_ERROR_TYPE = {status: number, message: string};
export type TokenType = string | undefined;
export type TokenResponseType = {userToken : TokenType};

export type URLType = {
	url: keyof typeof data
};

export type UserLoginType = {
	username: string;
	password: string;
};

export type UserType = {
	id: string;
	name: string;
	email: string;
	avatar?: string;
};

export type SnackbarOptions = {
  message: ReactNode,
  duration?: number,
  type?: AlertColor,
}

export type AppStateType = null | {appState: StateContextType};

export enum TimePeriod {
	'year' = 'This Year',
	'month' = 'This Month',
}

export enum ExpenseType {
	credit = 'credit',
	debit = 'debit',
}

export type StateContextType = {
	saveToken: ({userTokenResponse}: {userTokenResponse: TokenResponseType}) => void,
	saveUser: ({user}: {user: UserType}) => void,
	user: UserType | null,
	userToken: string | undefined,
	signout: () => void,
	expenses: ExpenseDataType[],
	setExpenses: Dispatch<SetStateAction<ExpenseDataType[]>>
};

export type ExpenseDataType = {
	amount: string | number,
	category: string,
	date: string,
	description: string,
	type: ExpenseType | string,
};

export type CategoryDataType = {
	title: string,
	limit: number,
};

export type PieDataType = {type: string, value: number};

export type ExpensesResponseType = {expenses: ExpenseDataType[]};

export type CategoriesResponseType = {categories: CategoryDataType[]};

export type MessageObjectType = {message: string};

export type ChangeCategoriesResponseType = MessageObjectType;

export type CreateExpenseResponseType = MessageObjectType;

export type DeleteExpenseResponseType = MessageObjectType;

export type EditExpenseResponseType = MessageObjectType;

export type ChangeLimitResponseType = MessageObjectType;

export type LimitResponseType = {limit: string | null};

export type AllReturnTypes =
	UserType |
	TokenResponseType |
	ExpensesResponseType |
	MessageObjectType |
	LimitResponseType |
	CategoriesResponseType
;