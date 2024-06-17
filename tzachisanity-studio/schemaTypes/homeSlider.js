import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homeSlider',
  title: 'Home Page Slider',
  type: 'document',
  fields: [
    defineField({
      name: 'imageTitle',
      title: 'Image Title',
      type: 'string',
    }),
    defineField({
      name: 'sliderImage',
      title: 'Slider image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
