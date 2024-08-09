export function handleOptionsRequest(request: Request): Response {
	const requestURL = new URL(request.url);
	const { pathname } = requestURL;

	if (pathname === '/registration/options') {
		return new Response('Reg Options Request');
	} else if (pathname === '/authentication/options') {
		return new Response('Auth Options Request');
	} else {
		return new Response(undefined, { status: 404 });
	}
}
