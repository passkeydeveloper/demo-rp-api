import { z } from 'zod';
import { isoBase64URL } from '@simplewebauthn/server/helpers';


/**
 * Re-export this for simpler imports
 */
export { ZodError } from 'zod';


/**
 * Zod preprocessors
 */

/**
 * Boolean values in query params are actually strings, so coerce them to proper booleans
 */
function castToBoolean() {
	return z.preprocess((value) => {
		if (typeof value === 'boolean') {
			return value;
		}

		const _valLower = String(value).toLowerCase();

		if (_valLower === 'true') {
			return true;
		}

		if (_valLower === 'false') {
			return false;
		}

		return value;
	}, z.boolean());
}

/**
 * Ensure this string value is a valid base64url string
 */
function castToBase64urlString() {
	return z.preprocess((value, ctx) => {
		if (!isoBase64URL.isBase64URL(String(value))) {
			throw new z.ZodError([
				{
					code: z.ZodIssueCode.invalid_string,
					path: ctx.path,
					message: 'not a valid base64url string',
					validation: 'base64',
				}
			]);
		}

		return value;
	}, z.string().base64());
}

/**
 * Schema for incoming query params to configure registration options
 */
export const regOptionsInputSchema = z.object({
	userName: z.string(),
	userID: castToBase64urlString().optional(),
	userVerification: z.enum(['discouraged', 'preferred', 'required']).default('preferred'),
	attestation: z.enum(['none', 'direct']).default('none'),
	attachment: z.enum(['cross-platform', 'platform']).optional(),
	algES256: castToBoolean().default(true),
	algRS256: castToBoolean().default(true),
	discoverableCredential: z.enum(['discouraged', 'preferred', 'required']).default('required'),
});


/**
 * Schema for incoming query params to configure authentication options
 */
export const authOptionsInputSchema = z.object({});
