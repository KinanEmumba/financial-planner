import { AlertColor } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { data } from "src/api/api-data";

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

export type StateContextType = {
	saveToken: ({userTokenResponse}: {userTokenResponse: TokenResponseType}) => void,
	saveUser: ({user}: {user: UserType}) => void,
	user: UserType | null,
	userToken: string | undefined,
	signout: () => void,
	expenses: ExpenseDataType[],
	setExpenses: Dispatch<SetStateAction<ExpenseDataType[]>>,
	monthlyExpenseLimit: string | null
};

export type ExpenseType = 'credit' | 'debit';

export type ExpenseDataType = {
	amount: string | number,
	category: string,
	date: string,
	description: string,
	type: ExpenseType,
};

export type ExpensesResponseType = {expenses: ExpenseDataType[]};

export type MessageObjectType = {message: string};

export type CreateExpenseResponseType = MessageObjectType;

export type DeleteExpenseResponseType = MessageObjectType;

export type EditExpenseResponseType = MessageObjectType;

export type ChangeLimitResponseType = MessageObjectType;

export type AllReturnTypes = UserType | TokenResponseType | ExpensesResponseType | MessageObjectType;