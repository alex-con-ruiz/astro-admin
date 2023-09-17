import type { APIRoute } from 'astro';
import { authorization } from './utils/handleAuth';
import { handleResponse } from './utils/handleResponse';

export const GET: APIRoute = async ({ request }) => {
	try {
		await authorization(request.headers);

		return handleResponse<Record<string, string>>(200, {}, { msg: 'jeje' });
	} catch (err) {
		const error = err as Error;
		const code = error.name === 'JsonWebTokenError' ? 400 : 403;

		return handleResponse<Record<string, string>>(code, {}, { msg: error.message });
	}
};

