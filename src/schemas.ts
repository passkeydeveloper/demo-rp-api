import { z } from 'zod';


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
 * Schema for incoming query params to configure registration options
 */
export const regOptionsInputSchema = z.object({
	username: z.string(),
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
