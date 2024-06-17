import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutBlock',
  title: 'About Page Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Position',
      type: 'number',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
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
      name: 'blockImage',
      title: 'Block image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
