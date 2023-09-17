import { describe, test, expect } from 'vitest';
import { handleResponse } from '.';

describe('handleResponse utility', () => {
	test('should return a Response object with the provided status, headers, and data', () => {
		// Dado un set de status, headers y data de ejemplo
		const status = 200;
		const headers = { 'X-Custom-Header': 'custom-value' };
		const data = { message: 'Hello, world!' };

		// Especifico el tipo genérico en la llamada a la función
		const response = handleResponse<{ message: string }>(status, headers, data);

		// Verificar que el objeto Response se haya creado correctamente
		expect(response.status).toBe(status);

		// Verificar que los headers se hayan configurado correctamente
		expect(response.headers.get('X-Custom-Header')).toBe('custom-value');
		expect(response.headers.get('Content-Type')).toBe('application/json');

		// Verificar que los datos se hayan serializado correctamente en JSON
		return response.json().then((responseData) => {
			expect(responseData).toEqual(data);
		});
	});
});
