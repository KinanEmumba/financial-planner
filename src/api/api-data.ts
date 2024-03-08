import { TokenResponseType, UserType } from "src/utils/shared-types";

const getUserResponse: UserType = {
	name: 'John',
	email: 'abc@xyz.com',
	avatar: 'https://img.freepik.com/free-photo/smiling-man_1098-15443.jpg'
};
const getUserTokenResponse: TokenResponseType = {userToken: 'abcdef123456'};

export const data = {
	'user': getUserResponse,
	'user-token': getUserTokenResponse,
};