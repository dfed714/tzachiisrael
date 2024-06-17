import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'banners',
  title: 'Banners',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Which Page?',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
