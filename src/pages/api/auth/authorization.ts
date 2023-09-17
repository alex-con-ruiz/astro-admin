import type { APIRoute } from 'astro';
import { handleResponse } from '../utils/handleResponse';
import jwt from 'jsonwebtoken';

export const POST: APIRoute = async ({ request }) => {
	try {
		const token = request.headers.get('x-flx-token');

		const decodedData = jwt.verify(token as string, process.env.CLIENT_SECRET as string);

		if (decodedData) return handleResponse<jwt.JwtPayload | string>(200, {}, decodedData);

		return handleResponse<Record<string, string>>(403, {}, { msg: 'Forbidden' });
	} catch (err) {
		const error = err as Error;
		return handleResponse<Record<string, string>>(498, {}, { msg: error.message });
	}
};
