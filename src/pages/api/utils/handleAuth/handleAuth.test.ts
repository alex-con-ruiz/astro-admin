import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { authorization } from './index';
import AuthorizationError from '../Errors/AuthError';

describe('authorization function', () => {
	const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjM0IiwiaWF0IjoxNTE2MjM5MDIyfQ.mOLh1HdIgiP5YdqMX53dGyZKqR9BTufPfaJaB7r0QA0';
	const invalidToken = 'invalid-token';
	const mockHeaders = new Headers();
	mockHeaders.set('x-flx-token', validToken);

	beforeAll(() => {
		// Simular la configuración de la variable de entorno CLIENT_SECRET
		process.env.CLIENT_SECRET = '';
	});

	afterAll(() => {
		// Restaurar la variable de entorno CLIENT_SECRET después de las pruebas
		delete process.env.CLIENT_SECRET;
	});


	// TODO: create a test to verify the validity of a non-expired token with the secret key.
	/* test('should return decoded id for a valid token', async () => {
        const result = await authorization(mockHeaders);
        expect(result).toEqual('decoded-id'); // Cambia esto con el ID esperado
    }); */


	test('should throw AuthorizationError with status 401 if token is missing in headers', async () => {
		const headers = new Headers();

		try {
			await authorization(headers);
			expect(true).toBe(false);
		} catch (error) {
			const err = error as AuthorizationError;
			expect(err.message).toBe('Token is missing in headers');
			expect(err.statusCode).toBe(401);
		}
	});

	test('should throw AuthorizationError with status 403 for an invalid token', async () => {
		const headers = new Headers();
		headers.set('x-flx-token', invalidToken);

		try {
			await authorization(headers);
			expect(true).toBe(false);
		} catch (error) {
			const err = error as AuthorizationError;
			expect(err.message).toBe('Invalid token or token has expired');
			expect(err.statusCode).toBe(403);
		}
	});
});