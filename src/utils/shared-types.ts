import { AlertColor } from "@mui/material";
import { ReactNode } from "react";
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
	name: string;
	email: string;
	avatar?: string;
};

export type SnackbarOptions = {
  message: ReactNode,
  duration?: number,
  type?: AlertColor,
}

export type AppUserContextType = null | {
	saveToken: ({userTokenResponse}: {userTokenResponse: TokenResponseType}) => void,
	saveUser: ({user}: {user: UserType}) => void,
	user: UserType | null,
	userToken: string | undefined,
	signout: () => void,
};

export type APIDataType = {
	'user-auth': UserLoginType,
	'user': UserType,
};