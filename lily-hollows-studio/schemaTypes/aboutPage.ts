import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
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
    defineField({name: 'portraitImage', title: 'Portrait Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'accolades',
      title: 'Accolades',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'pressQuote',
      title: 'Press Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pressAttribution',
      title: 'Press Attribution',
      type: 'string',
    }),
  ],
})
