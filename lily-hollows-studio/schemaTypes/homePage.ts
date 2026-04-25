import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      initialValue: {current: ''},
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
        defineField({name: 'headline', title: 'Headline', type: 'string'}),
        defineField({name: 'subheadline', title: 'Subheadline', type: 'string'}),
        defineField({name: 'backgroundImage', title: 'Background Image', type: 'image', options: {hotspot: true}}),
        defineField({
          name: 'ctas',
          title: 'CTAs',
          type: 'array',
          of: [
            defineField({
              name: 'cta',
              title: 'CTA',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
                defineField({name: 'href', title: 'Href', type: 'url', validation: (rule) => rule.required()}),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'featuredMusic',
      title: 'Featured Music',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
        defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'releaseType', title: 'Release Type', type: 'string'}),
        defineField({name: 'year', title: 'Year', type: 'string'}),
        defineField({
          name: 'tracks',
          title: 'Tracks',
          type: 'array',
          of: [defineField({name: 'track', title: 'Track', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'latestVideo',
      title: 'Latest Video',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
        defineField({name: 'videoUrl', title: 'Video URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'upcomingShows',
      title: 'Upcoming Shows',
      type: 'array',
      of: [
        defineField({
          name: 'show',
          title: 'Show',
          type: 'object',
          fields: [
            defineField({name: 'date', title: 'Date', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'venue', title: 'Venue', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'city', title: 'City', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'ticketUrl', title: 'Ticket URL', type: 'url'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      fields: [
        defineField({name: 'headline', title: 'Headline', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        defineField({name: 'backgroundImage', title: 'Background Image', type: 'image', options: {hotspot: true}}),
      ],
    }),
  ],
})

