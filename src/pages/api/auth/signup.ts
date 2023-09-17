import type { APIRoute } from 'astro';
import { handleResponse } from '../utils/handleResponse';
import { db } from '.././../../Database/firebase';
import { collection, query, setDoc, doc, where, getDocs } from 'firebase/firestore/lite';
import bcrypt from 'bcryptjs';

type requestBody = {
    username: string;
    password: string;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const body: requestBody = await request.json();
        
		// check if user exist
		const users = collection(db, 'users');
		const q = query(users, where('username', '==', body.username.toLocaleLowerCase()));
		const userExist = !(await getDocs(q)).empty;

		if (!userExist) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(body.password.toLocaleLowerCase(), salt);
			await setDoc(doc(users), {
				id: crypto.randomUUID(), 
				username: body.username.toLocaleLowerCase(),
				password: hash
			});

			return handleResponse<Record<string, string>>(200, {}, { msg: 'User created successfully.' });
		}

		return handleResponse<Record<string, string>>(406, {}, { msg: `Username [ ${body.username} ] already exist.` });
	} catch (err) {
		const error = err as Error;
		return handleResponse<Record<string, string>>(498, {}, { msg: error.message });
	}

};