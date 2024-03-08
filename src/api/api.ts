import { data } from "src/api/api-data";

export const API = async ({ url }: { url: keyof typeof data }) => {
	console.log('API called with', url);
	const valueToReturn = data[url];
	const response: typeof valueToReturn = await new Promise((resolve, reject) => {
		const minValue = 1;
		const maxValue = 3;
		const randomTime = (Math.random() * (maxValue - minValue) + minValue) * 1000;
		setTimeout(() => resolve(valueToReturn), randomTime);
		if (url === 'user-token') {
			setTimeout(() => reject({status: 123, message: `opps! not working`}), randomTime);
		}
	})
	console.log('API response', response);
	return response;
};