import {defineField, defineType} from 'sanity'

export const videosPage = defineType({
  name: 'videosPage',
  title: 'Videos Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'string'}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'string'}),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        defineField({
          name: 'video',
          title: 'Video',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'venue', title: 'Venue', type: 'string'}),
            defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
            defineField({name: 'videoUrl', title: 'Video URL', type: 'url'}),
          ],
        }),
      ],
    }),
  ],
})

