import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Achievements',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Achievement Title',
      type: 'string',
      description: 'e.g. 1st Place in RoboWars',
    }),
    defineField({
      name: 'event',
      title: 'Event/Competition Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'image',
      title: 'Award/Team Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members Involved',
      type: 'string',
    }),
  ],
})