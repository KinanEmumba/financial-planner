import { useQuery } from "@tanstack/react-query";
import { API } from "./api";
import { UserLoginType } from "src/helpers/shared-types";

export const useGetUser = ({ username, password }: UserLoginType) => {
  return useQuery<unknown, Error>({
    queryKey: ['user', {username}],
		queryFn: () => API({url: 'user-auth'}),
		enabled: username !== '',
  });
};