import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { zfd } from 'zod-form-data';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { cose } from '@simplewebauthn/server/helpers';

import { ZodError, regOptionsInputSchema } from '../schemas';


/**
 * Generate registration options
 */
export async function handleCreateRegOptions(context: Context): Promise<Response> {
	// Parse options from query params
	let parsedInput;
	try {
		parsedInput = zfd.formData(regOptionsInputSchema).parse(context.req.query());
	} catch (err) {
		const _err = err as ZodError;
		throw new HTTPException(400, { message: JSON.stringify(_err.errors) });
	}

	const {
		algES256,
		algRS256,
		attestation,
		discoverableCredential,
		userVerification,
		username,
		attachment,
	} = parsedInput;

	const { RP_ID, RP_NAME } = context.env;

	let supportedAlgorithmIDs = [];

	if (algES256) {
		supportedAlgorithmIDs.push(cose.COSEALG.ES256);
	}

	if (algRS256) {
		supportedAlgorithmIDs.push(cose.COSEALG.RS256);
	}

	const opts = await generateRegistrationOptions({
		rpID: RP_ID,
		rpName: RP_NAME,
		userName: username,
		attestationType: attestation,
		authenticatorSelection: {
			authenticatorAttachment: attachment,
			residentKey: discoverableCredential,
			userVerification,
		},
		supportedAlgorithmIDs,
	});

	return context.json(opts);
}
