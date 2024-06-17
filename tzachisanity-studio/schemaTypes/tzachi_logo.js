import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tzachi_logo',
  title: 'Tzachi Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'tzachi_logo_image',
      title: 'Tzachi Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
