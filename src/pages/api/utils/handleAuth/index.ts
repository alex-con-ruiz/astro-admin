import jwt from 'jsonwebtoken';
import AuthorizationError from '../Errors/AuthError';

export const authorization = async (headers: Headers): Promise<jwt.JwtPayload | string> => {
	type Decoded = {
		id: string;
	}

	if (!headers) {
		throw new AuthorizationError('Headers are missing', 400); // Bad Request
	}

	const token = headers.get('x-flx-token');

	if (!token) {
		throw new AuthorizationError('Token is missing in headers', 401); // Unauthorized
	}

	try {
		const decoded = jwt.verify(token as string, process.env.CLIENT_SECRET as string) as Decoded;
		return decoded.id;
	} catch (error) {	
		throw new AuthorizationError('Invalid token or token has expired', 403); // Forbidden
	}
};
