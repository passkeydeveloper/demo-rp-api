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

import {
	handleCreateRegOptions,
	handleCreateAuthOptions,
	handleVerifyRegResponse,
	handleVerifyAuthResponse,
} from './handlers';


const app = new Hono();

app.get('/registration/options', handleCreateRegOptions);
app.get('/authentication/options', handleCreateAuthOptions);
app.post('/registration/verify', handleVerifyRegResponse);
app.post('/registration/verify', handleVerifyAuthResponse);

export default app;
