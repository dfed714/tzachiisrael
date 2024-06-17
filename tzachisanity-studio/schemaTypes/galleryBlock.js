import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'imageTitle',
      title: 'Image Title',
      type: 'string',
    }),
    defineField({
      name: 'galleryImage',
      title: 'Gallery image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
