import { z } from 'zod';


/**
 * Re-export this for simpler imports
 */
export { ZodError } from 'zod';

/**
 * Schema for incoming query params to configure registration options
 */
export const regOptionsInputSchema = z.object({
	username: z.string(),
	userVerification: z.enum(['discouraged', 'preferred', 'required']).default('preferred'),
	attestation: z.enum(['none', 'direct']).default('none'),
	attachment: z.enum(['cross-platform', 'platform']).optional(),
	algES256: z.boolean().default(true),
	algRS256: z.boolean().default(true),
	discoverableCredential: z.enum(['discouraged', 'preferred', 'required']).default('required'),
});


/**
 * Schema for incoming query params to configure authentication options
 */
export const authOptionsInputSchema = z.object({});
