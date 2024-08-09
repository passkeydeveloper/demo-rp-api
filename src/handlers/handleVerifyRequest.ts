export function handleVerifyRequest(request: Request): Response {
	const requestURL = new URL(request.url);
	const { pathname } = requestURL;

	if (pathname === '/registration/verify') {
		return new Response('Reg Verify Request');
	} else if (pathname === '/authentication/verify') {
		return new Response('Auth Verify Request');
	} else {
		return new Response(undefined, { status: 404 });
	}
}
