import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "src/api/api";
import {
	ChangeLimitResponseType,
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

export const usePostExpense = () => {
  return useMutation<CreateExpenseResponseType, Error, { expense: ExpenseDataType }>({
    mutationKey: ['expense'],
		mutationFn: ({ expense }) => API({url: 'expense/post', body: {expense}}) as Promise<CreateExpenseResponseType>
  });
};

export const useDeleteExpense = () => {
  return useMutation<CreateExpenseResponseType, Error, { expense: ExpenseDataType, id: number }>({
    mutationKey: ['expense'],
		mutationFn: ({ expense, id }) => API({url: 'expense/delete', body: {expense, id}}) as Promise<CreateExpenseResponseType>
  });
};

export const useEditExpense = () => {
  return useMutation<CreateExpenseResponseType, Error, { expense: ExpenseDataType, id: number }>({
    mutationKey: ['expense'],
		mutationFn: ({ expense, id }) => API({url: 'expense/edit', body: {expense, id}}) as Promise<CreateExpenseResponseType>
  });
};

export const useChangeLimit = () => {
  return useMutation<CreateExpenseResponseType, Error, { limit: number | string }>({
    mutationKey: ['limit'],
		mutationFn: ({ limit }) => API({url: 'limitChange', body: {limit}}) as Promise<ChangeLimitResponseType>
  });
};
