import type { APIRoute } from 'astro';
import { handleResponse } from '../utils/handleResponse';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { collection, getDocs, where, query } from 'firebase/firestore/lite';
import { db } from '.././../../Database/firebase';

type requestBody = {
	username: string;
	password: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const body: requestBody = await request.json();

		// Get docs
		const users = collection(db, 'users');
		const q = query(users, where('username', '==', body.username.toLocaleLowerCase()));
		const recievedDocs = await getDocs(q);

		// if user does not exist.
		if (recievedDocs.empty) return handleResponse<Record<string, string>>(404, {}, { msg: 'User not found.' });

		// check if password match
		const { id, password } = recievedDocs.docs[0].data();
		const decodedPass = await bcrypt.compare(body.password.toLocaleLowerCase(), password);
		if (!decodedPass) return handleResponse<Record<string, string>>(401, {}, { msg: 'Wrong password.' });

		// Create and return a jwt;

		const token = jwt.sign(
			{ id },
			process.env.CLIENT_SECRET as string,
			{
				expiresIn: '1h',
				algorithm: 'HS256'
			}
		);

		return handleResponse<Record<string, string>>(200, { 'x-flx-token': token }, {});
	} catch (err) {
		const error = err as Error;
		return handleResponse<Record<string, string>>(498, {}, { msg: error.message });
	}
};

