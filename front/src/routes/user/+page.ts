import type { IUser } from '$src/lib/helper/userDto';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	console.log('fetching user');
	const res = await fetch('/user');
	const user: IUser = await res.json();

	return {
		user
	};
};
