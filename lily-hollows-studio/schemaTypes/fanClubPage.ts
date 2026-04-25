import {defineField, defineType} from 'sanity'

export const fanClubPage = defineType({
  name: 'fanClubPage',
  title: 'Fan Club Page',
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
    defineField({name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3}),
    defineField({
      name: 'perks',
      title: 'Perks',
      type: 'array',
      of: [
        defineField({
          name: 'perk',
          title: 'Perk',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({name: 'ctaHeading', title: 'CTA Heading', type: 'string'}),
  ],
})

