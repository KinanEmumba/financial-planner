import { data } from "src/api/mock-database"
import { AllReturnTypes } from "src/utils/shared-types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const API = async ({ url, body }: { url: keyof typeof data, body?: any }) => {
	console.log(`API called with ${url}`);
	const response: AllReturnTypes = await new Promise((resolve, reject) => {
		const minValue = 1;
		const maxValue = 3;
		const randomTime = (Math.random() * (maxValue - minValue) + minValue) * 1000;
		// if (url === 'expense') {
		// 	setTimeout(() => reject({status: 123, message: `API ERROR: cant get expenses`}), randomTime);
		// }
		setTimeout(() => resolve(data[url](body)), randomTime);
	})
	console.log(`API response for ${url}`, response);
	return response;
};