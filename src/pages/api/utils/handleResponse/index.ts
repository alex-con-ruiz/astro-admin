export function handleResponse<T>(status:number, headers: Record<string, string>, data: T): Response {
	return new Response(
		JSON.stringify({
			data
		}), {
			status,
			headers: {
				'Content-Type': 'application/json',
				...headers
			}
		}
	);
}
