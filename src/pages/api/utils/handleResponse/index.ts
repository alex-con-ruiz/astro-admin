interface HttpHeaders {
	[key: string]: string;
}

/**
 * @description Creates a Response object with the provided status code, headers, and data.
 * @param status The HTTP status code for the response.
 * @param headers The HTTP headers for the response.
 * @param data The data to be included in the response body.
 * @returns A Response object.
 * @throws Error if the status code is invalid or if headers are not a valid object.
 */
export function handleResponse<T>(status: number, headers: HttpHeaders, data: T): Response {
	// Validate that 'headers' is a valid object
	if (typeof headers !== 'object' || headers === null) {
		throw new Error('Invalid headers');
	}

	// Create the response
	const responseHeaders: HttpHeaders = {
		'Content-Type': 'application/json',
		...headers,
	};

	const jsonResponse = JSON.stringify(data);

	return new Response(jsonResponse, {
		status,
		headers: responseHeaders,
	});
}
