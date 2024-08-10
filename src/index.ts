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
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import {
	handleCreateRegOptions,
	handleCreateAuthOptions,
	handleVerifyRegResponse,
	handleVerifyAuthResponse,
} from './handlers';


const app = new Hono();

// Set up CORS headers
app.use('*', async (ctx, next) => {
	const corsMiddleware = cors({
		origin: [
			'http://localhost:8787',
			// TODO: Populate other origins from `ctx.env` later
		],
	});

	return corsMiddleware(ctx, next);
});

app.get('/registration/options', handleCreateRegOptions);
app.get('/authentication/options', handleCreateAuthOptions);
app.post('/registration/verify', handleVerifyRegResponse);
app.post('/registration/verify', handleVerifyAuthResponse);

export default app;
