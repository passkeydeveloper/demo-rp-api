import { Context } from 'hono';


export async function handleCreateAuthOptions(context: Context): Promise<Response> {
	return context.text('handleCreateAuthOptions');
}
