// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';
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
		const response = await SELF.fetch('https://example.com/registration/options?username=foo', { method: 'GET' });
		expect(response.status).toBe(200);
	});

	it('recognizes GET /authentication/options', async () => {
		const response = await SELF.fetch('https://example.com/authentication/options', { method: 'GET' });
		expect(response.status).toBe(200);
	});

	it('recognizes POST /registration/verify', async () => {
		const response = await SELF.fetch('https://example.com/registration/verify', { method: 'POST' });
		expect(response.status).toBe(200);
	});

	it('recognizes POST /authentication/options', async () => {
		const response = await SELF.fetch('https://example.com/registration/verify', { method: 'POST' });
		expect(response.status).toBe(200);
	});

	it('errors on non-GET and non-POST requests', async () => {
		const response = await SELF.fetch('https://example.com', { method: 'PUT' });
		expect(response.status).toBe(404);
	});
});

describe('registration options', () => {
	it('should require username', async () => {
		const response = await SELF.fetch('https://example.com/registration/options', { method: 'GET' });
		expect(response.status).toBe(400);
		expect(await response.text()).toMatch("username");
	});

	it('should generate basic options', async () => {
		const username = 'mmiller';
		const response = await SELF.fetch(`https://example.com/registration/options?username=${username}`, { method: 'GET' });
		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toMatch('application/json');

		const opts = await response.json() as PublicKeyCredentialCreationOptionsJSON;

		expect(opts.challenge).toBeTypeOf('string');
		expect(opts.rp.name).toEqual('passkeys.dev');
		expect(opts.rp.id).toEqual('passkeys.dev');
		expect(opts.user.id).toBeTypeOf('string');
		expect(opts.user.name).toEqual(username);
		expect(opts.user.displayName).toEqual('');
		expect(opts.pubKeyCredParams).toEqual([
			{ "alg": -7, "type": "public-key" },
			{ "alg": -257, "type": "public-key" },
		]);
		expect(opts.timeout).toEqual(60000);
		expect(opts.attestation).toEqual('none');
		expect(opts.excludeCredentials).toEqual([]);
		expect(opts.authenticatorSelection?.residentKey).toEqual('required');
		expect(opts.authenticatorSelection?.userVerification).toEqual('preferred');
		expect(opts.authenticatorSelection?.requireResidentKey).toEqual(true);
		expect(opts.extensions?.credProps).toEqual(true);
	});
});
