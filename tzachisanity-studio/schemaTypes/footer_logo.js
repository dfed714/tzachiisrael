import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footerLogo',
  title: 'Footer Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'footerLogoImage',
      title: 'Footer Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
