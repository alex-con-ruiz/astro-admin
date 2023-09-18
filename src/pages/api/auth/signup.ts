import type { APIRoute } from 'astro';
import { handleResponse } from '../utils/handleResponse';
import { createUser } from 'src/Database/usersManagement';

type requestBody = {
	username: string;
	password: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const { username, password }: requestBody = await request.json();

		const { status, msg } = await createUser(username, password);

		return handleResponse<Record<string, string>>(status, {}, { msg });
	} catch (err) {
		const error = err as Error;
		return handleResponse<Record<string, string>>(498, {}, { msg: error.message });
	}

};