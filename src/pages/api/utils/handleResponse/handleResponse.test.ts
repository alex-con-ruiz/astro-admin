import { describe, test, expect } from 'vitest';
import { handleResponse } from '.';

describe('handleResponse utility', () => {
	test('should return an Http Response with status 200', async ()=> {
		const mockedResponseData = {
			data: 'test',
		};
        
		const response = await handleResponse<string>(200, {'x-test': 'test'}, 'test').json();

		expect(response).toEqual(mockedResponseData);
	});
});
