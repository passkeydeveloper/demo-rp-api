import { z } from 'zod';


/**
 * Re-export this for simpler imports
 */
export { ZodError } from 'zod';

/**
 * Schema for incoming query params to configure registration options
 */
export const regOptionsInputSchema = z.object({});


/**
 * Schema for incoming query params to configure authentication options
 */
export const authOptionsInputSchema = z.object({});
