import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // The real publish date. Never backdate.
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    audience: z.array(z.enum(['developers', 'business'])).default(['developers']),
    // Drafts show up in `npm run dev` only.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
