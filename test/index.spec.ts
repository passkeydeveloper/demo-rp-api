// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
// import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
// const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Routing tests', () => {
	// it('responds with Hello World! (unit style)', async () => {
	// 	const request = new IncomingRequest('http://example.com');
	// 	// Create an empty context to pass to `worker.fetch()`.
	// 	const ctx = createExecutionContext();
	// 	const response = await worker.fetch(request, env, ctx);
	// 	// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
	// 	await waitOnExecutionContext(ctx);
	// 	expect(await response.text()).toMatchInlineSnapshot(`"Hello from passkeys.dev RP demo API!"`);
	// });

	// it('responds with Hello World! (integration style)', async () => {
	// 	const response = await SELF.fetch('https://example.com');
	// 	expect(await response.text()).toMatchInlineSnapshot(`"Hello from passkeys.dev RP demo API!"`);
	// });

	it('recognizes GET /registration/options', async () => {
		const response = await SELF.fetch('https://example.com/registration/options', { method: 'GET' });
		expect(response.status).toBe(200);
	})

	it('recognizes GET /authentication/options', async () => {
		const response = await SELF.fetch('https://example.com/authentication/options', { method: 'GET' });
		expect(response.status).toBe(200);
	})

	it('recognizes POST /registration/verify', async () => {
		const response = await SELF.fetch('https://example.com/registration/verify', { method: 'POST' });
		expect(response.status).toBe(200);
	})

	it('recognizes POST /authentication/options', async () => {
		const response = await SELF.fetch('https://example.com/registration/verify', { method: 'POST' });
		expect(response.status).toBe(200);
	})
});
