import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "./react-query-setup"

import { API } from "src/api/api"
import {
	CategoriesResponseType,
	CategoryDataType,
	ChangeCategoriesResponseType,
	ChangeLimitResponseType,
	CreateExpenseResponseType,
	ExpenseDataType,
	ExpensesResponseType,
	LimitResponseType,
	TokenResponseType,
	TokenType,
	UserLoginType,
	UserType
} from "src/utils/shared-types"

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
    queryKey: ['expenses'],
		queryFn: () => API({url: 'expenses'}) as Promise<ExpensesResponseType>,
		// enabled: !!id,
  });
};

export const usePostExpense = () => {
  return useMutation<CreateExpenseResponseType, Error, { expense: ExpenseDataType }>({
    mutationKey: ['expenses'],
		mutationFn: ({ expense }) => API({url: 'expense/post', body: {expense}}) as Promise<CreateExpenseResponseType>,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'], refetchType: 'active'})
  });
};

export const useDeleteExpense = () => {
  return useMutation<CreateExpenseResponseType, Error, { expense: ExpenseDataType, id: number }>({
    mutationKey: ['expenses'],
		mutationFn: ({ expense, id }) => API({url: 'expense/delete', body: {expense, id}}) as Promise<CreateExpenseResponseType>,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'], refetchType: 'active'})
  });
};

export const useEditExpense = () => {
  return useMutation<CreateExpenseResponseType, Error, { expense: ExpenseDataType, id: number }>({
    mutationKey: ['expenses'],
		mutationFn: ({ expense, id }) => API({url: 'expense/edit', body: {expense, id}}) as Promise<CreateExpenseResponseType>,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'], refetchType: 'active'})
  });
};

export const useGetLimit = () => {
  return useQuery<LimitResponseType, Error>({
    queryKey: ['limit'],
		queryFn: () => API({url: 'limit'}) as Promise<LimitResponseType>
  });
};

export const useChangeLimit = () => {
	return useMutation<CreateExpenseResponseType, Error, { limit: number | string }>({
		mutationKey: ['limit'],
		mutationFn: ({ limit }) => API({url: 'limitChange', body: {limit}}) as Promise<ChangeLimitResponseType>,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['limit'], refetchType: 'active'})
  });
};

export const useGetCategories = () => {
	return useQuery<CategoriesResponseType, Error>({
		queryKey: ['categories'],
		queryFn: () => API({url: 'categories'}) as Promise<CategoriesResponseType>
	});
};

export const useSetCategories = () => {
	return useMutation<ChangeCategoriesResponseType, Error, {categories: CategoryDataType[]}>({
		mutationKey: ['categories'],
		mutationFn: ({ categories }) => API({url: 'categoriesChange', body: {categories}}) as Promise<ChangeCategoriesResponseType>,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'], refetchType: 'active'})
	});
};