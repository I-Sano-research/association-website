import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    venue: z.string().optional(),
    status: z.enum(['upcoming', 'finished']),
    image: z.string().optional(),
    summary: z.string(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/activities' }),
  schema: z.object({
    title: z.string(),
    priority: z.number(),
    icon: z.string().optional(),
    image: z.string().optional(),
    summary: z.string(),
  }),
});

export const collections = { events, activities };
