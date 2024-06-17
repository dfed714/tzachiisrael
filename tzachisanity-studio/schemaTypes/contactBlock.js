import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactBlock',
  title: 'Contact Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'usOffice',
      title: 'US OFFICE',
      type: 'text',
    }),
    defineField({
      name: 'israelOffice',
      title: 'ISRAEL OFFICE',
      type: 'text',
    }),
    defineField({
      name: 'generalEmail',
      title: 'General Email',
      type: 'text',
    }),
    defineField({
      name: 'specificEmail',
      title: 'Specific Email',
      type: 'text',
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
