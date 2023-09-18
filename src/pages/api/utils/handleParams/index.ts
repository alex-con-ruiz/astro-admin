/**
 * @description Recieves a request to get params and returns a proxy Object handler with generic type.
 * @param request The request containing the URL.
 * @returns An object of generic type <T> representing the URL parameters.
 * @throws Error if the URL is invalid.
 * @example handleParams<ParamType>({ url: "https://example.com/?foo=bar" });
 */
export function handleParams<T>(request: { url: string | URL }): T {
	try {
		const url = typeof request.url === 'string' ? new URL(request.url) : request.url;
		const params = new URLSearchParams(url.search);
		const paramObj = new Proxy(params, {
			get: (params, prop) => params.get(prop.toString()),
		});

		// Workaround to support generic type despite return is an URLSearchParams
		// eslint-disable-next-line
		// @ts-ignore:
		return paramObj;
	} catch (error) {
		throw new Error('Invalid URL');
	}
}
