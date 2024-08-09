/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { handleOptionsRequest, handleVerifyRequest } from './handlers';


export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Handle the request
		if (request.method === 'GET') {
			return handleOptionsRequest(request);
		} else if (request.method === 'POST') {
			return handleVerifyRequest(request);
		} else {
			return new Response('Only GET and POST are supported', { status: 405 });
		}
	},
} satisfies ExportedHandler<Env>;
