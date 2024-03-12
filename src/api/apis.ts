import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "src/api/api";
import {
	CreateExpenseResponseType,
	ExpenseDataType,
	ExpensesResponseType,
	TokenResponseType,
	TokenType,
	UserLoginType,
	UserType
} from "src/utils/shared-types";

export const useGetToken = ({ loginInfo } : { loginInfo: UserLoginType }) => {
  return useMutation<TokenResponseType, Error>({
    mutationKey: ['token', {loginInfo}],
		mutationFn: () => API({url: 'user-token'}) as Promise<TokenResponseType>,
  });
};

export const useGetUser = ({ userToken } : { userToken: TokenType }) => {
  return useQuery<UserType, Error>({
    queryKey: ['user', {userToken}],
		queryFn: () => API({url: 'user'}) as Promise<UserType>,
		enabled: !!userToken,
  });
};

export const useGetExpenses = ({ id } : { id: string }) => {
  return useQuery<ExpensesResponseType, Error>({
    queryKey: ['expenses', {id}],
		queryFn: () => API({url: 'expenses'}) as Promise<ExpensesResponseType>,
		enabled: !!id,
  });
};

export const usePostExpense = ({ expense } : { expense: ExpenseDataType }) => {
	expense.date = new Date().toISOString();
  return useMutation<CreateExpenseResponseType, Error>({
    mutationKey: ['expense'],
		mutationFn: () => API({url: 'expense'}) as Promise<CreateExpenseResponseType>
  });
};
