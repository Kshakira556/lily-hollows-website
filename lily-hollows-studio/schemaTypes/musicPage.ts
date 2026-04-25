import {defineField, defineType} from 'sanity'

export const musicPage = defineType({
  name: 'musicPage',
  title: 'Music Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'string'}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'string'}),
    defineField({
      name: 'albums',
      title: 'Albums',
      type: 'array',
      of: [
        defineField({
          name: 'album',
          title: 'Album',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'type', title: 'Type', type: 'string'}),
            defineField({name: 'year', title: 'Year', type: 'string'}),
            defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}}),
            defineField({
              name: 'tracks',
              title: 'Tracks',
              type: 'array',
              of: [defineField({name: 'track', title: 'Track', type: 'string'})],
            }),
          ],
        }),
      ],
    }),
  ],
})

