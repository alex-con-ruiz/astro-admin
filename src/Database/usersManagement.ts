import { db } from './firebase';
import { collection, query, setDoc, doc, where, getDocs, CollectionReference } from 'firebase/firestore/lite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type UserManagementResponse = {
    status: number;
    msg: string
    token?: {
        'x-flx-token': string;
    };
}

const getCollection = async (collectionName: string): Promise<CollectionReference> => {
	return collection(db, collectionName);
};

const searchIfUserExist = async (usersCollection: CollectionReference, username: string) => {
	const q = query(usersCollection, where('username', '==', username.toLocaleLowerCase()));
	return !(await getDocs(q)).empty;
};

export const createUser = async (username: string, password: string): Promise<UserManagementResponse> => {

	const fetchedUsers = await getCollection('users');
	const userExists = await searchIfUserExist(fetchedUsers, username);

	if (!userExists) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password.toLocaleLowerCase(), salt);
		await setDoc(doc(fetchedUsers), {
			id: crypto.randomUUID(),
			username: username.toLocaleLowerCase(),
			password: hash
		});

		return {
			status: 200,
			msg: 'User created successfully.'
		};
	}

	return {
		status: 406,
		msg: `Username [ ${username} ] already exists.`
	};
};

export const userLogIn = async (username: string, password: string): Promise<UserManagementResponse> => {
	const fetchedUsers = await getCollection('users');

	// console.log(fetchedUsers);
    
	const userExists = await searchIfUserExist(fetchedUsers, username);

	if (!userExists) return { status: 404, msg: 'User not found.' };

	const q = query(fetchedUsers, where('username', '==', username.toLocaleLowerCase()));
	const userFound = await getDocs(q);

	const { id: dbID, password: dbPass } = userFound.docs[0].data();
	const decodedPass = await bcrypt.compare(password.toLocaleLowerCase(), dbPass);
	if (!decodedPass) return { status: 401, msg: 'Wrong password.' };

	const token = jwt.sign(
		{ id: dbID },
        process.env.CLIENT_SECRET as string,
        { expiresIn: '1h', algorithm: 'HS256' }
	);

	return {
		status: 200, msg: 'Token generated.', token: { 'x-flx-token': token }
	};
};


export {
	getCollection,
	searchIfUserExist,
};
