
/**
 * @description Recieves a request to get params, returns a proxy Object handler with generic type 
 * @type generic  
 * @param request
 * @returns Object of generic <T> overriding URLSearchParams;
 * @Example handleParams<ParamType>(request);
 */
export function handleParams<T>(request: { url: string | URL; }): T {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);
	const paramObj = new Proxy(params, {
		get: (params, prop) => params.get(prop.toString()),
	});

	// Workaround to support generic type despite return is an URLSearchParams
	// eslint-disable-next-line
	// @ts-ignore:
	return paramObj;
}
