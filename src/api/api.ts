import { URLType } from "src/helpers/shared-types";
import { data } from "src/api/api-data";

export const API = async ({url}: URLType) => {
	const response = await new Promise((resolve, reject) => {
		const minValue = 1.5;
		const maxValue = 3;
		const randomTime = (Math.random() * (maxValue - minValue) + minValue) * 1000;
		setTimeout(() => resolve(data[url]), randomTime);
	})
	return response;
};