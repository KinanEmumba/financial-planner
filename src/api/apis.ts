import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "./api";
import { TokenResponseType, TokenType, UserLoginType, UserType } from "src/helpers/shared-types";

export const useGetToken = ({ loginInfo } : {loginInfo: UserLoginType}) => {
  return useMutation<TokenResponseType, Error>({
    mutationKey: ['token', {loginInfo}],
		mutationFn: () => API({url: 'user-token'}) as Promise<TokenResponseType>,
  });
};

export const useGetUser = ({ userToken } : {userToken: TokenType}) => {
  return useQuery<UserType, Error>({
    queryKey: ['user', {userToken}],
		queryFn: () => API({url: 'user'}) as Promise<UserType>,
		enabled: !!userToken,
  });
};
