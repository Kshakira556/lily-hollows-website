import {defineField, defineType} from 'sanity'

export const showsPage = defineType({
  name: 'showsPage',
  title: 'Shows Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'string'}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'string'}),
    defineField({
      name: 'shows',
      title: 'Shows',
      type: 'array',
      of: [
        defineField({
          name: 'show',
          title: 'Show',
          type: 'object',
          fields: [
            defineField({name: 'type', title: 'Type', type: 'string'}),
            defineField({name: 'venue', title: 'Venue', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'date', title: 'Date', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'city', title: 'City', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'ticketUrl', title: 'Ticket URL', type: 'url'}),
          ],
        }),
      ],
    }),
  ],
})

