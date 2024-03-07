import { TokenResponseType, UserType } from "src/helpers/shared-types";

const getUserResponse: UserType = {name: 'abc', email: 'abc@xyz.com'};
const getUserTokenResponse: TokenResponseType = {userToken: 'abcdef123456'};

export const data = {
	'user': getUserResponse,
	'user-token': getUserTokenResponse,
};