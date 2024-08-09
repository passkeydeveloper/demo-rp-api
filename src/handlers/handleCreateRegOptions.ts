import { Context } from 'hono';
import { zfd } from 'zod-form-data';

import { regOptionsInputSchema } from '../schemas';


/**
 * Generate registration options
 */
export async function handleCreateRegOptions(context: Context): Promise<Response> {
	const parsedInput = zfd.formData(regOptionsInputSchema).parse(context.req.query());
	console.log(parsedInput);
	return context.text(`handleCreateRegOptions ${JSON.stringify(parsedInput)}`);
}
