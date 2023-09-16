import jwt from 'jsonwebtoken';
import type { APIRoute } from 'astro';
import { handleParams } from './utils/handleParams';
import { handleResponse } from './utils/handleResponse';

type Params = {
	msg: string;
}

export const GET: APIRoute = ({ request }) => {
	const params: Params = handleParams<Params>(request);

	const token = jwt.sign({username: 'alex', password: 'payaso'}, `${process.env.CLIENT_SECRET}` , { expiresIn: 60 });

	console.log(token);
	
	jwt.verify(token, process.env.CLIENT_SECRET as string, (err: any, user: any) => {
		console.log(err, user);
	});


	return handleResponse<string>(200, {}, params.msg);
};


