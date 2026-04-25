import {defineField, defineType} from 'sanity'

export const notFoundPage = defineType({
  name: 'notFoundPage',
  title: 'Not Found Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'message', title: 'Message', type: 'string'}),
    defineField({name: 'ctaLabel', title: 'CTA Label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'CTA Href', type: 'string'}),
  ],
})

