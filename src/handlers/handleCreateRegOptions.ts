import { Context } from 'hono';


export async function handleCreateRegOptions(context: Context): Promise<Response> {
	return context.text('handleCreateRegOptions');
}
