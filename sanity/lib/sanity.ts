import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'qraw8rm7', // Find this in sanity.config.ts
  dataset: 'ers',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for fresh data during dev
});

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}