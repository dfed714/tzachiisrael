import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'slogan',
  title: 'Slogan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'sloganImage',
      title: 'Slogan Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
