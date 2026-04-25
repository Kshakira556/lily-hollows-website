import {defineField, defineType} from 'sanity'

export const storePage = defineType({
  name: 'storePage',
  title: 'Store Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heroHeading', title: 'Hero Heading', type: 'string'}),
    defineField({name: 'heroSubheading', title: 'Hero Subheading', type: 'string'}),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineField({
          name: 'product',
          title: 'Product',
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'price', title: 'Price', type: 'string'}),
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'productUrl', title: 'Product URL', type: 'url'}),
          ],
        }),
      ],
    }),
  ],
})

