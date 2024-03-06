import { data } from "src/api/api-data";

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
};

export type APIDataType = {
	'user-auth': UserLoginType;
};