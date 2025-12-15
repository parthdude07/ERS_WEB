import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery Uploads',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      description: 'e.g., "Orientation 2025" or "Random Clicks"',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        defineField({
          name: 'photo',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
      options: { layout: 'grid' },
      validation: (Rule) => Rule.min(1).max(40),
    }),
  ],
})