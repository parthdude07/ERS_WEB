import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'popup',
  title: 'Popup Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Popup Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      description: 'The popup will be visible until one day after this date.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Popup Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      description: 'Optional link where the popup should redirect to.',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: true,
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Manually control visibility. If false, it will not show regardless of date.',
    }),
    defineField({
      name: 'button1',
      title: 'Button 1',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { 
          name: 'url', 
          type: 'url', 
          title: 'URL',
          validation: Rule => Rule.uri({
            allowRelative: true,
            scheme: ['http', 'https', 'mailto', 'tel']
          })
        },
      ],
    }),
    defineField({
      name: 'button2',
      title: 'Button 2',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { 
          name: 'url', 
          type: 'url', 
          title: 'URL',
          validation: Rule => Rule.uri({
            allowRelative: true,
            scheme: ['http', 'https', 'mailto', 'tel']
          })
        },
      ],
    }),
  ],
})
