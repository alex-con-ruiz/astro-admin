import { describe, test, expect } from 'vitest';
import { handleResponse } from '.';

describe('handleResponse utility', () => {
	test('should return a Response object with the provided status, headers, and data', () => {
		// Given a set of example status, headers, and data
		const status = 200;
		const headers = { 'X-Custom-Header': 'custom-value' };
		const data = { message: 'Hello, world!' };

		// Specify the generic type in the function call
		const response = handleResponse<{ message: string }>(status, headers, data);

		// Verify that the Response object was created correctly
		expect(response.status).toBe(status);

		// Verify that the headers were set correctly
		expect(response.headers.get('X-Custom-Header')).toBe('custom-value');
		expect(response.headers.get('Content-Type')).toBe('application/json');

		// Verify that the data was serialized correctly to JSON
		return response.json().then((responseData) => {
			expect(responseData).toEqual(data);
		});
	});
});
