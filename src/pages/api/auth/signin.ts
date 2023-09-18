import type { APIRoute } from 'astro';
import { handleResponse } from '../utils/handleResponse';
import { userLogIn } from 'src/Database/usersManagement';

export const POST: APIRoute = async ({ request }) => {
	type requestBody = {
		username: string;
		password: string;
	}

	try {
		// Deserialize the request body to extract username and password
		const { username, password }: requestBody = await request.json();

		// Check if both username and password are provided
		if (!username || !password) {
			return handleResponse(400, {}, { msg: 'Both username and password are required.' });
		}

		// Call the userLogIn function to attempt user login
		const { status, token, msg } = await userLogIn(username, password);

		// Return a response based on the result of user login attempt
		return handleResponse<Record<string, string>>(status, { ...token }, { msg });
	} catch (err) {
		const error = err as Error;

		// Return a 498 Invalid Token response with an error message
		return handleResponse<Record<string, string>>(498, {}, { msg: error.message });
	}
};
