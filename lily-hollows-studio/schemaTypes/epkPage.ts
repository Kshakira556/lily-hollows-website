import {defineField, defineType} from 'sanity'

export const epkPage = defineType({
  name: 'epkPage',
  title: 'EPK Page',
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
      name: 'pressKitPdf',
      title: 'Press Kit PDF',
      type: 'file',
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'object',
      fields: [
        defineField({name: 'portraitImage', title: 'Portrait Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}]}),
      ],
    }),
    defineField({
      name: 'pressImages',
      title: 'Press Images',
      type: 'array',
      of: [defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}})],
    }),
    defineField({
      name: 'featuredTrack',
      title: 'Featured Track',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'audioUrl', title: 'Audio URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [defineField({name: 'achievement', title: 'Achievement', type: 'string'})],
    }),
  ],
})
