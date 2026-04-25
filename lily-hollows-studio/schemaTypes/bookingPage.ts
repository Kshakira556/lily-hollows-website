import {defineField, defineType} from 'sanity'

export const bookingPage = defineType({
  name: 'bookingPage',
  title: 'Booking Page',
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
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      fields: [
        defineField({name: 'email', title: 'Email', type: 'string'}),
        defineField({name: 'phone', title: 'Phone', type: 'string'}),
        defineField({name: 'location', title: 'Location', type: 'string'}),
        defineField({name: 'whatsAppUrl', title: 'WhatsApp URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'eventTypes',
      title: 'Event Types',
      type: 'array',
      of: [defineField({name: 'eventType', title: 'Event Type', type: 'string'})],
    }),
    defineField({
      name: 'quoteCard',
      title: 'Quote Card',
      type: 'object',
      fields: [
        defineField({name: 'headline', title: 'Headline', type: 'string'}),
        defineField({name: 'quote', title: 'Quote', type: 'text', rows: 3}),
        defineField({name: 'signature', title: 'Signature', type: 'string'}),
        defineField({name: 'note', title: 'Note', type: 'string'}),
      ],
    }),
  ],
})

