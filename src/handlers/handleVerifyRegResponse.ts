import { Context } from 'hono';


export async function handleVerifyRegResponse(context: Context): Promise<Response> {
	return context.text('handleVerifyRegResponse');
}
