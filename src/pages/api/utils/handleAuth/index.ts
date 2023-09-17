import jwt from 'jsonwebtoken';

export const authorization = async (headers: Headers): Promise<jwt.JwtPayload | string> => {
	type Decoded = {
		id: string;
	}

	const token = headers.get('x-flx-token');

	const decoded = jwt.verify(token as string, process.env.CLIENT_SECRET as string) as Decoded;

	return decoded.id;
};