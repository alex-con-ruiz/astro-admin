import type { APIRoute } from 'astro';
import { handleParams } from '../utils/handleParams';
import { handleResponse } from '../utils/handleResponse';

type Params = {
	msg: string;
}

export const POST: APIRoute = ({ request }) => {
	const params: Params = handleParams<Params>(request);

	params.msg;

	return handleResponse<string>(200, {}, params.msg);
};

