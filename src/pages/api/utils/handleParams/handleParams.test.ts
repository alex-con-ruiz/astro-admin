import { describe, test, expect } from 'vitest';
import { handleParams } from '.';

type TestParams = {
	foo: string;
	bar?: string;
};

describe('handleParams utility', () => {
	test('should return an object with a single property', () => {
		const request = { url: 'https://example.com/?foo=bar' };
		const params = handleParams<TestParams>(request);
		expect(params.foo).toEqual('bar');
	});

	test('should return an object with multiple properties', () => {
		const request = { url: 'https://example.com/?foo=bar&bar=baz' };
		const params = handleParams<TestParams>(request);
		expect(params.foo).toEqual('bar');
		expect(params.bar).toEqual('baz');
	});

	test('should return an empty object for a URL with no parameters', () => {
		const request = { url: 'https://example.com/' };
		const params = handleParams<TestParams>(request);
		expect(Object.keys(params).length).toEqual(0);
	});

	test('should handle a URL object as input', () => {
		const urlObject = new URL('https://example.com/?foo=bar');
		const request = { url: urlObject };
		const params = handleParams<TestParams>(request);
		expect(params.foo).toEqual('bar');
	});

	test('should throw an error for an invalid URL', () => {
		const request = { url: 'invalid-url' };
		expect(() => handleParams<TestParams>(request)).toThrow('Invalid URL');
	});
});